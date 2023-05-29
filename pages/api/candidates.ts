// pages/api/candidates.js
import axios from "axios";

const apiUrl = process.env.API_URL;
const filesUrl = process.env.FILES_URL;
const oldImagesUrl = "https://uploads-ssl.webflow.com/639caaf7a5013a75ff0a6116/";
const candidatesUrl =
  "candidates?populate[technologiesNew][populate][0]=tech_category&populate=Image&[populate]=CV&pagination[page]=";

async function fetchCandidates(page = 1, allCandidates = []) {
  try {
    const response = await axios.get(
      `${apiUrl}${candidatesUrl}${page}&pagination[pageSize]=100`
    );

    const updatedCandidates = response.data.data.map(candidate => {
      if (candidate.attributes.Image?.data?.attributes.url) {
        candidate.attributes.Image.data.attributes.url = filesUrl + candidate.attributes.Image.data.attributes.url;
      } 
      if (candidate.attributes.CV?.data?.attributes.url) { 
        candidate.attributes.CV.data.attributes.url = filesUrl + candidate.attributes.CV.data.attributes.url;
      }
      if (candidate.attributes?.Picture) {
        candidate.attributes.Picture = oldImagesUrl + candidate.attributes.Picture;
       }
      return candidate;
    });

    const newAllCandidates = allCandidates.concat(updatedCandidates);

    if (response.data.meta.pagination.pageCount > page) {
      return fetchCandidates(page + 1, newAllCandidates);
    } else {
      return newAllCandidates;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async (req, res) => {
  const candidates = await fetchCandidates();
  res.status(200).json(candidates);
};
