import { Candidate } from "../types/candidates";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Chip from "@mui/material/Chip";

const CandidateItem = (data: Candidate, tags, setTags) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg m-1 md:h-[500px] px-3 lg:px-6">
      <div className="flex justify-center pt-4">
        {data?.Image?.data ? (
          <img
            className="w-1/3 rounded-full"
            src={data?.Image?.data?.attributes.url}
            alt="Profile Picture"
          />
        ) : (
          <img
            className="w-1/3 rounded-full"
            src={data?.Picture}
            alt="Profile Picture"
          />
        )}
      </div>
      <div className="pt-2 lg:pt-4 text-center">
        <div className="font-bold text-sm md:text-lg mb-1 lg:mb-2">
          {data?.FirstName}
        </div>
        <div className="flex text-center justify-center">
          <div className="text-xs md:text-base lg:mb-2">📍 {data.Location}</div>
        </div>
        <p className="my-1 text-center text-xs md:text-base">
          {data?.CV?.data?.attributes.url && (
            <a target="_blank" href={data.CV.data.attributes.url}>
              Download CV
            </a>
          )}
        </p>
        <div className="text-xs md:text-base">
          <div className="text-xs md:text-base no-underline text-blue-800">
            {data.Interview ? (
              <a href={data.Interview} target="blank">
                <span className="hidden lg:block">
                  Watch {data.FirstName}'s 1 minute <br /> video introduction
                </span>
                <span className="block lg:hidden">Video introduction</span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="text-center">
          <p className="m-0 text-xs md:text-base">{data.Experience}</p>
        </div>
        {data.Github ? (
          <div className="text-xs md:text-sm my-1 lg:my-2 flex justify-center items-center">
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
          <div className="text-xs md:text-sm mb-2 flex justify-center item">
            <Link href={`${data.Portfolio}`}>
              <a target="_blank" className="flex justify-center">
                💼 <span className="mt-[4px] ml-[4px]">Portfolio</span>
              </a>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="pt-1 lg:py-2 text-center">
        <p className="font-bold mb-2 lg:mb-4 text-sm lg:text-base">Skills</p>
        {data?.technologiesNew?.data.length ? (
          <div className="">
            {data?.technologiesNew?.data
              .filter((technology, i) => i < 5)
              .map((technology, index) => (
                <span
                  onClick={() => {
                    if (!tags.includes(technology.attributes.Name)) {
                      setTags([...tags, technology.attributes.Name]);
                    } else {
                      const selectedTags = [...tags].filter(
                        (selectedTag) =>
                          selectedTag !== technology.attributes.Name
                      );
                      setTags(selectedTags);
                    }
                  }}
                  key={index}
                  className={` ${
                    tags.includes(technology.attributes.Name)
                      ? "bg-[#1976D2] text-white"
                      : "bg-gray-200 text-ay-700"
                  } rounded-full px-3 py-1 text-[10px] md:text-sm front-semibold mr-2 mb-2 inline-block justify-center items-center`}
                >
                  {technology.attributes.Name}
                </span>
              ))}
          </div>
        ) : (
          <div>
            {data?.Technologies?.technologies
              .filter((technology, i) => i < 5)
              .map((technology, index) => (
                <span
                  onClick={() => {
                    if (!tags.includes(technology)) {
                      setTags([...tags, technology]);
                    } else {
                      const selectedTags = [...tags].filter(
                        (selectedTag) => selectedTag !== technology
                      );
                      setTags(selectedTags);
                    }
                  }}
                  key={index}
                  className={`${
                    tags.includes(technology)
                      ? "bg-[#1976D2] text-white"
                      : "bg-gray-200 text-ay-700"
                  } rounded-full px-3 py-1 text-[10px] md:text-sm front-semibold mr-2 mb-2 inline-block justify-center items-center`}
                >
                  {technology}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const [isAllTag, setIsAllTag] = useState(true);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function fetchCandidates() {
    try {
      const response = await axios.get("/api/candidates");
      setCandidates(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (tags.length > 0) {
      setIsAllTag(false);
    } else {
      setIsAllTag(true);
    }
  }, [tags]);

  useEffect(() => {
    fetchCandidates();
    fetchCategories();
  }, []);

  const FilteredCandidates = (candidates) => {
    return candidates
      .filter((candidate) => {
        if (searchTerm == "") {
          return candidate;
        } else if (
          candidate.attributes.technologiesNew.data.some(
            (tech) =>
              tech.attributes.Name.toLowerCase().includes(
                searchTerm.toLowerCase()
              ) ||
              (tech.attributes.Name &&
                tech.attributes.Name.toLowerCase().includes(
                  searchTerm.toLowerCase()
                ))
          )
        ) {
          return candidate;
        }
      })

      .filter((candidate) => {
        if (
          !isAllTag &&
          tags.every((tag) =>
            candidate.attributes.technologiesNew.data.some(
              (tech) =>
                tech.attributes.Name.toLowerCase() === tag.toLowerCase() ||
                (tech.attributes.Name &&
                  tech.attributes.Name.toLowerCase() === tag.toLowerCase())
            )
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
        <div key={index}>
          {" "}
          {CandidateItem(candidate.attributes, tags, setTags)}{" "}
        </div>
      ));
  };

  if (candidates != null) {
    return (
      <div className="container my-5 mx-auto px-4 md:px-12">
        <div className="flex justify-center mb-5">
          <h1 className="text-[28px] md:text-[32px]">Candidate Catalog</h1>
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
        <div className="flex max-w-full">
          <div className="mr-5">
            <Chip
              onClick={() => {
                setTags([]), setIsAllTag(true);
              }}
              variant="outlined"
              label="All"
              color={!isAllTag ? "default" : "primary"}
            />
          </div>
          <div>
            <div className="max-w-full">
              {categories.map((category, index) => {
                const children = category.attributes.technologies.data.map(
                  (technology, index) => {
                    const tag = technology.attributes.Name;
                    return (
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
                    );
                  }
                );
                const categoryTag = category.attributes.Category;
                return (
                  <div key={index} className="flex mb-2">
                    <Chip
                      onClick={() => {
                        if (!selectedCategories.includes(categoryTag)) {
                          setSelectedCategories([
                            ...selectedCategories,
                            categoryTag,
                          ]);
                        } else {
                          const currentSelectedCategories = [
                            ...selectedCategories,
                          ].filter(
                            (selectedCategory) =>
                              selectedCategory !== categoryTag
                          );
                          setSelectedCategories(currentSelectedCategories);
                        }
                      }}
                      label={categoryTag}
                      color={
                        selectedCategories.includes(categoryTag)
                          ? "primary"
                          : "default"
                      }
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3">
                      {selectedCategories.includes(categoryTag) && children}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="my-1 px-1 w-full flex-col sm:flex-row grid grid-cols-2 lg:grid-cols-3">
          {FilteredCandidates(candidates)}
        </div>
        {FilteredCandidates(candidates).length == 0 ? (
          <div>
            <h1 className="text-center text-2xl mt-5">
              Looking for a unicorn developer? <br /> Give us a call{" "}
              <a href="tel:+13374880343">337-488-0343</a>
            </h1>
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
