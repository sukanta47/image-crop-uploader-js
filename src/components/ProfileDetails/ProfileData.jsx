import profilePic from "../../assets/profile.jpg";

export const profile = {
  name: "John Doe",
  image: profilePic,
  proficiency: "Senior Frontend Developer",
  skills: ["React", "TypeScript", "Tailwind CSS", "Redux", "Next.js"],
  education: [
    { degree: "B.Sc. Computer Science", institution: "MIT", year: "2018" },
    {
      degree: "M.Sc. Software Engineering",
      institution: "Harvard",
      year: "2020",
    },
  ],
  workExperience: [
    { role: "Frontend Developer", company: "Google", duration: "2018 - 2020" },
    {
      role: "Senior Developer",
      company: "Microsoft",
      duration: "2020 - Present",
    },
  ],
};