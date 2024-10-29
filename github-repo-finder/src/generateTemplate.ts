type Repo = {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks: number;
  language: string;
};

export const generateTemplate = ({
  full_name, 
  description, 
  stargazers_count, 
  forks, 
  language 
}: Repo) => (
  `
    <div class="w-full">
      <h2 class="font-semibold break-words w-full text-xl" id="repoTitle">${full_name}</h2>
      <p class="text-gray-400 flex-1 h-full leading-4 line-clamp-6 text-sm font-semibold text-pretty" id="repoDescription">${description}</p>
    </div>
    <div class="flex w-full mt-2 font-bold gap-2">
      <div class="flex items-center gap-2">
        <img class="w-5" src="/language-icon.svg">
        <span class="text-sm">${language}</span>
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="/star.svg">
        <span class="text-sm">${stargazers_count}</span>
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="/fork.svg">
        <span class="text-sm">${forks}</span>
      </div>
      <div class="flex justify-end flex-1 items-center gap-2">
      <a href="https://github.com/${full_name}" target="_blank" class="flex items-center gap-2">
        <img class="w-5" src="/link.svg">
      </a>
      </div>
    </div>
  `
)