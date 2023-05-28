export interface Candidate {
  Picture: string;
  FirstName: string;
  LastName: string;
  Image: { data: { attributes: { url: string } } };
  CV: { data: { attributes: { url: string } } };
  Location: string;
  Interview: string;
  English: string;
  Experience: string;
  Technologies: { technologies: [] };
  Github: string;
  Portfolio: string;
  Projects: { projects: [] };
}
