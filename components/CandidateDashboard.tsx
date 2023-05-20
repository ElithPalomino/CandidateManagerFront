import { Candidate } from "../types/candidates";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Chip from "@mui/material/Chip";

let baseUrl = "https://candidate-backend.herokuapp.com/api/candidates";

const filesUrl = "https://uploads-ssl.webflow.com/639caaf7a5013a75ff0a6116/";

const CandidateItem = (data: Candidate) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg m-3">
      <div className="flex justify-center pt-4">
        <img
          className="w-1/3 rounded-full"
          src={`${filesUrl}${data.Picture}`}
          alt="Profile Picture"
        />
      </div>
      <div className="px-6 pt-4 text-center">
        <div className="font-bold text-base md:text-lg md:text-l mb-2">
          {data?.FirstName}
        </div>
        <div className="flex text-center justify-center">
          <div className="text-sm md:text-base mb-2 mr-2">
            📍 {data.Location}
          </div>
        </div>
        <div className="text-xs md:text-base mb-2 flext">
          <div className="text-xs md:text-base mb-2 no-underline text-blue-800">
            {data.Interview ? (
              <a href={data.Interview} target="blank">
                Watch {data.FirstName}'s 1 minute <br /> video introduction
              </a>
            ) : null}
          </div>
          {data.Experience}
        </div>
        {data.Github ? (
          <div className="text-2xs md:text-sm mb-2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "#000000" }}
              className="mr-2"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
            <Link href={`${data.Github}`}>
              <a target="_blank">Github</a>
            </Link>
          </div>
        ) : null}
        {data.Portfolio ? (
          <div className="text-2xs md:text-sm mb-2 flex justify-center">
            <Link href={`${data.Portfolio}`}>
              <a target="_blank"> 💼 Portfolio</a>
            </Link>
          </div>
        ) : null}
        <p className="text-gray-700 text-base"></p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <p className="font-bold mb-4">Skills</p>
        {data?.Technologies?.technologies.map((technology, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {technology}
          </span>
        ))}
      </div>
      {data.Projects ? (
        <div className="px-6 pb-4 text-center">
          <h1 className="pb-3 font-bold text-md">Projects</h1>
          {data.Projects.projects.map((project, index) => (
            <Link href={project} key={index}>
              <a target="_blank" className="p-2">
                🏆{" "}
                <span className="underline text-sky-500	">
                  Project #{index + 1}
                </span>
              </a>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const CandidateDashboard = () => {
  const tagsFilters = [
    "React",
    "React Native",
    "SQA",
    ".NET",
    "PHP",
    "Ruby on Rails",
  ];

  let [isAllTag, setIsAllTag] = useState(true);
  let [tags, setTags] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidate] = useState(null);
  function GetTags() {
    useEffect(() => {
      if (tags.length > 0) {
        setIsAllTag(false);
      } else {
        setIsAllTag(true);
      }
    }, [tags]);
  }

  function GetCandidates() {
    useEffect(() => {
      axios.get(baseUrl).then((response) => {
        setCandidate(response.data);
      });
    }, []);
  }

  const FilteredCandidates = (candidates) => {
    return candidates.data
      .filter((candidate) => {
        if (searchTerm == "") {
          return candidate;
        } else if (
          candidate.attributes.Technologies.technologies
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          return candidate;
        }
      })
      .filter((candidate) => {
        if (
          !isAllTag &&
          tags.every((tag) =>
            candidate.attributes.Technologies?.technologies.includes(tag)
          )
        ) {
          return candidate;
        } else if (isAllTag) {
          return candidate;
        } else {
          return null;
        }
      })
      .map((candidate, index) => (
        <div key={index}> {CandidateItem(candidate.attributes)} </div>
      ));
  };

  GetTags();
  GetCandidates();
  if (candidates != null) {
    return (
      <div className="container my-5 mx-auto px-4 md:px-12">
        <div className="flex justify-center mb-5">
          <h1 className="text-[28px] md:text-[32px]">Candidate finder</h1>
        </div>
        <div className="flex justify-center mb-5">
          <div className="bg-gray-100 flex rounded-lg">
            <img
              className="w-[15px] h-[15px] ml-2 mt-2"
              src="https://cdn-icons-png.flaticon.com/512/49/49116.png"
              id="input_img"
            />
            <input
              className="bg-gray-100 text-black rounded-lg pl-2 py-1 active:border-0"
              type="text"
              placeholder="Search skills..."
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div>
          <Chip
            onClick={() => {
              setTags([]), setIsAllTag(true);
            }}
            variant="outlined"
            label="All"
            color={!isAllTag ? "default" : "primary"}
          />
          {tagsFilters.map((tag, index) => (
            <Chip
              onClick={() => {
                if (!tags.includes(tag)) {
                  setTags([...tags, tag]);
                } else {
                  const selectedTags = [...tags].filter(
                    (selectedTag) => selectedTag !== tag
                  );
                  setTags(selectedTags);
                }
              }}
              className="!mx-2 !mb-1"
              key={index}
              label={tag}
              color={tags.includes(tag) ? "primary" : "default"}
            />
          ))}
        </div>
        <div className="my-1 px-1 w-full flex-col sm:flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FilteredCandidates(candidates)}
        </div>
        {FilteredCandidates(candidates).length == 0 ? (
          <div>
            <h1 className="text-center text-2xl mt-5">No Candidates Found</h1>
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center">
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
};

export default CandidateDashboard;
