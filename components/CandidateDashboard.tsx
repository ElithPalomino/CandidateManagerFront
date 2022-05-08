import { Candidate } from "../types/candidates";

const candidates = [
  {
    picture: "valtin-modified.png",
    firstName: "Valentin",
    lastName: "Rodriguez",
    location: "Barranquilla",
    english: "C1",
    experience: "4",
    technologies: ["React", "Node.js", "Angular", "Vue.js"],
    github: "ElithPalomino",
  },
  {
    picture: "valtin-modified.png",
    firstName: "Valentin",
    lastName: "Rodriguez",
    location: "Barranquilla",
    english: "C1",
    experience: "4",
    technologies: ["React", "Node.js", "Angular", "Vue.js"],
    github: "ElithPalomino",
  },
  {
    picture: "valtin-modified.png",
    firstName: "Valentin",
    lastName: "Rodriguez",
    location: "Barranquilla",
    english: "C1",
    experience: "4",
    technologies: ["React", "Node.js", "Angular", "Vue.js"],
    github: "ElithPalomino",
  },
  {
    picture: "valtin-modified.png",
    firstName: "Valentin",
    lastName: "Rodriguez",
    location: "Barranquilla",
    english: "C1",
    experience: "4",
    technologies: ["React", "Node.js", "Angular", "Vue.js"],
    github: "ElithPalomino",
  },
];

const filesUrl =
  "https://21799681.fs1.hubspotusercontent-na1.net/hubfs/21799681/";
const githubUrl = "https://github.com/";

const CandidateItem = (data: Candidate) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg m-3">
      <div className="flex justify-center">
        <img
          className="w-1/2"
          src={`${filesUrl}${data.picture}`}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{data.firstName}</div>
        <div className="flex text-center justify-center">
          <div className="text-l mb-2 mr-2">📍 {data.location}</div>
          <div className="text-l mb-2">🇺🇸 {data.english}</div>
        </div>
        <div className="text-md mb-2">
          {data.experience} years of experience
        </div>
        <p className="text-gray-700 text-base"></p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        {data.technologies.map((technology) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="my-1 px-1 w-full flex flex-col sm:flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate, index) => (
          <div key={index}> {CandidateItem(candidate)} </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;
