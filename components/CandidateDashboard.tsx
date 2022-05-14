import { Candidate } from "../types/candidates";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

let baseUrl = "https://candidate-manager-api-prod.herokuapp.com/api/candidates";

const filesUrl =
  "https://21799681.fs1.hubspotusercontent-na1.net/hubfs/21799681/";
const githubUrl = "https://github.com/";

const CandidateItem = (data: Candidate) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg m-3">
      <div className="flex justify-center">
        <img
          className="w-1/2"
          src={`${filesUrl}${data.Picture}`}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 pt-4 text-center">
        <div className="font-bold text-xl mb-2">{data.FirstName}</div>
        <div className="flex text-center justify-center">
          <div className="text-l mb-2 mr-2">📍 {data.Location}</div>
          <div className="text-l mb-2">🇺🇸 {data.English}</div>
        </div>
        <div className="text-md mb-2 flext">
          {data.Experience} years of experience
        </div>
        <div className="text-md mb-2 flex justify-center">
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
          <Link href={`${githubUrl}${data.Github}`}>
            <a target="_blank">Github</a>
          </Link>
        </div>
        <p className="text-gray-700 text-base"></p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        {data.Technologies.technologies.map((technology, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
  const [candidates, setCandidate] = useState(null);
  function GetCandidates() {
    useEffect(() => {
      axios.get(baseUrl).then((response) => {
        setCandidate(response.data);
      });
    }, []);
  }
  GetCandidates();
  if (candidates != null) {
    return (
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="my-1 px-1 w-full flex flex-col sm:flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {candidates.data.map((candidate, index) => (
            <div key={index}> {CandidateItem(candidate.attributes)} </div>
          ))}
          {candidates.data.attributes}
        </div>
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
