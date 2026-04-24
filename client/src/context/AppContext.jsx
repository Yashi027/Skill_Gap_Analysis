import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentGithubUser, setCurrentGithubUser] = useState(
        localStorage.getItem("currentGithubUser") || null
    );

    const [selectedCareer, setSelectedCareer] = useState(
        localStorage.getItem("selectedCareer") || ""
    );

    const [roadmap, setRoadmap] = useState(
        JSON.parse(localStorage.getItem("roadmap")) || []
    );

    const [skillRatings, setSkillRatings] = useState(() => {
        const user = localStorage.getItem("currentGithubUser");
        if (!user) return {};
        return JSON.parse(localStorage.getItem(`skillRatings_${user}`)) || {};
    });

    const [githubData, setGithubData] = useState(
        JSON.parse(localStorage.getItem("githubData")) || null
    );

    const [weeklyProgress, setWeeklyProgress] = useState(
        JSON.parse(localStorage.getItem("weeklyProgress")) || Array(7).fill(0)
    );

    const [streak, setStreak] = useState(
        parseInt(localStorage.getItem("streak")) || 0
    );

    const [progress, setProgress] = useState(0);

    const fetchContributionCalendar = async (username) => {
        const query = {
            query: `
            query($login:String!) {
              user(login:$login) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
            `,
            variables: { login: username }
        };

        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            },
            body: JSON.stringify(query)
        });

        const data = await res.json();

        return data?.data?.user?.contributionsCollection?.contributionCalendar;
    };

    const calculateStreak = (calendar) => {
        const days = calendar.weeks
            .flatMap((week) => week.contributionDays)
            .reverse();

        let count = 0;

        for (let day of days) {
            if (day.contributionCount > 0) count++;
            else break;
        }

        return count;
    };

    const generateRoadmap = (ratings = skillRatings) => {
        if (!selectedCareer) return;

        const careerSkills = {
            frontend: ["HTML", "CSS", "JavaScript", "React", "Redux"],
            backend: ["NodeJs", "Express", "MongoDb", "SQL", "API_Design"],
            fullstack: ["HTML","CSS","JavaScript","React","NodeJs","MongoDb"]
        };

        const skills = careerSkills[selectedCareer] || [];

        const generated = skills.map((skill) => {
            const rating = ratings[skill] || 0;

            return {
                name: skill,
                difficulty:
                    rating <= 2
                        ? "Beginner"
                        : rating === 3
                        ? "Intermediate"
                        : "Advanced",
                priority:
                    rating <= 2
                        ? "High"
                        : rating === 3
                        ? "Medium"
                        : "Low"
            };
        });

        setRoadmap(generated);
        localStorage.setItem("roadmap", JSON.stringify(generated));
    };

    const fetchGithubData = async (username) => {
        try {
            const [userRes, repoRes, calendar] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos`),
                fetchContributionCalendar(username)
            ]);

            const userData = await userRes.json();
            const repoData = await repoRes.json();

            if (!userRes.ok || !repoRes.ok) {
                throw new Error("GitHub User Not Found");
            }

            const languageCounts = {};

            repoData.forEach((repo) => {
                if (repo.language) {
                    languageCounts[repo.language] =
                        (languageCounts[repo.language] || 0) + 1;
                }
            });

            const syncMap = {
                JavaScript: "JavaScript",
                TypeScript: "JavaScript",
                HTML: "HTML",
                CSS: "CSS",
                React: "React",
                NodeJs: "NodeJs"
            };

            const autoRatings = {};

            Object.keys(languageCounts).forEach((lang) => {
                const skill = syncMap[lang];

                if (skill) {
                    const count = languageCounts[lang];

                    let rating = 1;

                    if (count > 5) rating = 5;
                    else if (count >= 3) rating = 4;
                    else if (count === 2) rating = 3;
                    else if (count === 1) rating = 2;

                    autoRatings[skill] = Math.max(
                        autoRatings[skill] || 0,
                        rating
                    );
                }
            });

            const savedRatings =
                JSON.parse(
                    localStorage.getItem(`skillRatings_${username}`)
                ) || autoRatings;

            setSkillRatings(savedRatings);
            localStorage.setItem(
                `skillRatings_${username}`,
                JSON.stringify(savedRatings)
            );

            const allDays = calendar.weeks.flatMap(
                (week) => week.contributionDays
            );

            const last7 = allDays
                .slice(-7)
                .map((day) => day.contributionCount);

            const userStreak = calculateStreak(calendar);

            const score =
                userData.public_repos * 2 +
                userData.followers * 5 +
                userStreak * 3;

            const summary = {
                name: userData.name,
                avatar: userData.avatar_url,
                repoCount: userData.public_repos,
                followers: userData.followers,
                score: Math.min(score, 100),
                profile_url: userData.html_url,
                location: userData.location,
                languages: languageCounts,
                totalContributions: calendar.totalContributions
            };

            setGithubData(summary);
            setWeeklyProgress(last7);
            setStreak(userStreak);
            setCurrentGithubUser(username);

            localStorage.setItem("githubData", JSON.stringify(summary));
            localStorage.setItem(
                "weeklyProgress",
                JSON.stringify(last7)
            );
            localStorage.setItem("streak", userStreak);
            localStorage.setItem("currentGithubUser", username);

            generateRoadmap(savedRatings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        generateRoadmap();
        localStorage.setItem("selectedCareer", selectedCareer);
    }, [selectedCareer, skillRatings]);

    useEffect(() => {
        if (roadmap.length > 0) {
            const completed = roadmap.filter(
                (item) => skillRatings[item.name] === 5
            ).length;

            setProgress(
                Math.round((completed / roadmap.length) * 100)
            );
        } else {
            setProgress(0);
        }
    }, [roadmap, skillRatings]);

    useEffect(() => {
        if (currentGithubUser) {
            localStorage.setItem(
                `skillRatings_${currentGithubUser}`,
                JSON.stringify(skillRatings)
            );
        }
    }, [skillRatings, currentGithubUser]);

    return (
        <AppContext.Provider value={{
            selectedCareer,
            setSelectedCareer,
            skillRatings,
            setSkillRatings,
            githubData,
            setGithubData,
            roadmap,
            setRoadmap,
            progress,
            setProgress,
            weeklyProgress,
            setWeeklyProgress,
            streak,
            setStreak,
            generateRoadmap,
            fetchGithubData
        }}>
            {children}
        </AppContext.Provider>
    );
};