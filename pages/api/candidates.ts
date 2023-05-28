// pages/api/candidates.js
import axios from "axios";

const apiUrl = process.env.API_URL;
const candidatesUrl =
  "candidates?populate[technologiesNew][populate][0]=tech_category&populate=Image&[populate]=CV&pagination[page]=";
async function fetchCandidates(page = 1, allCandidates = []) {
  try {
    const response = await axios.get(
      `${apiUrl}${candidatesUrl}${page}&pagination[pageSize]=100`
    );
    const updatedCandidates = allCandidates.concat(response.data.data);

    if (response.data.meta.pagination.pageCount > page) {
      return fetchCandidates(page + 1, updatedCandidates);
    } else {
      return updatedCandidates;
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
