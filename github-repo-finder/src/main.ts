import { generateTemplate } from './generateTemplate';
import '@fontsource-variable/quicksand';
import './style.css';

// Elements
const form = document.querySelector('#languages') as HTMLFormElement;
const label = document.querySelector('#dropdownLabel') as HTMLSpanElement;
const statusInfo = document.querySelector('#statusInfo') as HTMLSpanElement;
const repoContainer = document.querySelector('#repo-container') as HTMLDivElement;
const refresh = document.querySelector('#refresh') as HTMLButtonElement;

// Variables
let language = '';
let error = false;
let repo = {
  full_name: '',
  description: '',
  stargazers_count: 0,
  forks: 0,
};

// API Endpoints
const API_LANGUAGES = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';
const getReposAPI = (language: string) => `https://api.github.com/search/repositories?q={language:${language}}`;

// Helper Functions
const updateStateStyle = () => {
  if (error) {
    repoContainer.classList.add('error');
    repoContainer.innerHTML = '<span class="font-medium">Error fetching repositories</span>';
    statusInfo.textContent = 'Error fetching repositories';
    refresh.textContent = 'Click to retry';
    refresh.classList.add('error');
    refresh.classList.remove('hidden');
  } else {
    repoContainer.classList.remove('error');
    repoContainer.classList.remove('justify-center');
    repoContainer.classList.add('justify-between');
    repoContainer.classList.add('border-2', 'border-black');  
    refresh.classList.remove('error');
    refresh.textContent = 'Refresh';
  }
};

const showLoading = (isLoading: boolean) => {
  if (!isLoading) return
  repoContainer.innerHTML = '<span class="font-medium">Loading, please wait...</span>';
};

const resetRepoContainer = () => {
  repoContainer.classList.replace('justify-between', 'justify-center');
  repoContainer.innerHTML = `
    <span class="font-medium" id="statusInfo">Please select a language</span>
  `;
};

const fetchLanguages = async () => {
  try {
    const response = await fetch(API_LANGUAGES);
    const data = await response.json();
    renderLanguages(data);
  } catch {
    console.error('Error fetching languages');
  }
};

const renderLanguages = (languages: any[]) => {
  languages.forEach((language) => {
    if (!language.value) return;
    const li = document.createElement('li');
    li.innerHTML = `
      <label class="flex cursor-pointer py-1 w-full justify-between gap-2">
        <span class="font-medium select-none">${language.title}</span>
        <input type="radio" name="languages" value="${language.value}">
      </label>
    `;
    form?.appendChild(li);
  });
};

const fetchRepos = async () => {
  const API_REPOS = getReposAPI(language);
  error = false;
  try {
    showLoading(true);
    const response = await fetch(API_REPOS);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.items.length);
    repo = data.items[randomIndex];
    if (data.items.length === 0) throw new Error();
    renderRepo();
  } catch (err) {
    handleError();
  } finally {
    showLoading(false);
  }
};

const renderRepo = () => {
  updateStateStyle();
  repoContainer.innerHTML = generateTemplate({...repo, language})
  refresh.textContent = 'Refresh';
  refresh.classList.remove('hidden');
};

const handleError = () => {
  error = true;
  updateStateStyle();
};

// Event Listeners
form.addEventListener('change', (event) => {
  const target = event.target as HTMLInputElement;
  language = target.value;
  label.textContent = language;
  resetRepoContainer();
  fetchRepos();
});

refresh.addEventListener('click', () => {
  resetRepoContainer();
  fetchRepos();
});

// Initializing
fetchLanguages();
