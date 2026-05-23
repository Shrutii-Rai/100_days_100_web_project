/* ============================================================
   CONFIGURATION
   ============================================================ */
if (typeof REPO_OWNER === 'undefined') {
  window.REPO_OWNER = 'dhairyagothi';
  window.REPO_NAME = '100_days_100_web_project';
}
window.REPO_OWNER = window.REPO_OWNER || 'dhairyagothi';
window.REPO_NAME = window.REPO_NAME || '100_days_100_web_project';

let currentPage = 1;
//for the number of visible projects in one page.
let itemsPerPage = 9;
let projectData = [];
let filteredProjectData = [];
let currentCategory = 'all';
let currentDifficulty = 'all';

const PROJECT_DATA = [
  {
    day: 'Day 1',
    name: 'To-Do List',
    description: 'To-Do List',
    url: './public/TO_DO_LIST/todolist.html',
    tags: ['javascript', 'todo'],
    category: 'beginner'
  },
  {
    day: 'Day 2',
    name: 'Digital Clock',
    description: 'Digital Clock',
    url: './public/digital_clock/digitalclock.html',
    tags: ['javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 3',
    name: 'Indian Flag',
    description: 'Indian Flag',
    url: './public/indianflag/flag.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 4',
    name: 'Dropdown Nav Bar',
    description: 'Dropdown Nav Bar',
    url: './public/dropdown_navbar/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 5',
    name: 'Animated Cursor',
    description: 'Animated Cursor',
    url: './public/Animated-cursor/animated-cursor.html',
    tags: ['ui', 'javascript', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 6',
    name: 'Auto Background Image Slider',
    description: 'Auto Background Image Slider',
    url: './public/Background-Image-sider/slider.html',
    tags: ['javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 7',
    name: 'Typewriter',
    description: 'Typewriter',
    url: './public/typewriter/typewriter.html',
    tags: ['html', 'css', 'javascript'],
    category: 'advanced'
  },
  {
    day: 'Day 8',
    name: 'Parallel-X Website',
    description: 'Parallel-X Website',
    url: './public/Parallel-x%20website/parallal.html',
    tags: ['css'],
    category: 'intermediate'
  },
  {
    day: 'Day 9',
    name: 'Captcha Generator',
    description: 'Captcha Generator',
    url: './public/captcha/captcha.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 10',
    name: 'QR Code Generator',
    description: 'QR Code Generator',
    url: './public/qr%20generator/qr.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 11',
    name: 'Serve Website Using Express',
    description: 'Serve Website Using Express',
    url: './public/index.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 12',
    name: 'Nodemailer Contact Form',
    description: 'Nodemailer Contact Form',
    url: './public/gmail_nodemailer/public/mail.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 13',
    name: 'Login Form Using MERN',
    description: 'Login Form Using MERN',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/loginusingmern',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 14',
    name: 'File Uploader',
    description: 'File Uploader',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/file_uploader',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 15',
    name: 'Progress Bar',
    description: 'Progress Bar',
    url: './public/progress_bar/progress_bar.html',
    tags: ['ui', 'css', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 16',
    name: 'Scroll Bar CSS',
    description: 'Scroll Bar CSS',
    url: './public/Scroll Game Dark Run/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 17',
    name: 'Slider Using Swiper API',
    description: 'Slider Using Swiper API',
    url: './public/slider%20box/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 18',
    name: 'Carousel Solar System',
    description: 'Carousel Solar System',
    url: './public/carousal/index.html',
    tags: ['css', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 19',
    name: 'Planto',
    description: 'Planto',
    url: './public/plantwebsite/plant.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 20',
    name: 'EveSparks',
    description: 'EveSparks',
    url: 'https://evesparks.onrender.com/',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 21',
    name: 'Video BG Slider Using React',
    description: 'Video BG Slider Using React',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/travel_website',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 22',
    name: 'Page Loader',
    description: 'Page Loader',
    url: './public/pageloader/pageloader.html',
    tags: ['ui', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 23',
    name: 'Jarvis Virtual Assistant',
    description: 'Jarvis Virtual Assistant',
    url: './public/Jarvis-AI-main/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 24',
    name: 'Chat Bot',
    description: 'Chat Bot',
    url: './public/AI%20ChatBot/chatbot.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 25',
    name: 'Tic-Tac-Toe',
    description: 'Tic-Tac-Toe',
    url: './public/TicTacToe/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 26',
    name: 'Maze Game',
    description: 'Maze Game',
    url: './public/Maze-Game-main/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 27',
    name: 'Memory Game',
    description: 'Memory Game',
    url: './public/MemoryGame/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 28',
    name: 'Wordle',
    description: 'Wordle',
    url: './public/WORDLE/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 29',
    name: 'Snake Game',
    description: 'Snake Game',
    url: './public/snake_game/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 30',
    name: 'Flappy-bird-game',
    description: 'Flappy-bird-game',
    url: './public/Flappy-bird-main/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 31',
    name: 'Password Manager',
    description: 'Password Manager',
    url: './public/password%20manager/index.html',
    tags: ['tool', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 32',
    name: 'Missionaries & Cannibals',
    description: 'Missionaries & Cannibals',
    url: './public/Missionaries&Cannibals/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 33',
    name: 'Weather Forecasting',
    description: 'Weather Forecasting',
    url: './public/Weather%20Forcasting/index.html',
    tags: ['weather', 'api'],
    category: 'intermediate'
  },
  {
    day: 'Day 34',
    name: 'Email Validator',
    description: 'Email Validator',
    url: './public/email%20validator/index.html',
    tags: ['api', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 35',
    name: 'Vanilla-JavaScript-Calculator',
    description: 'Vanilla-JavaScript-Calculator',
    url: './public/Vanilla-JavaScript-Calculator-master/index.html',
    tags: ['tool', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 36',
    name: 'Medical App',
    description: 'Medical App',
    url: './public/Medical_App/index.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 37',
    name: '2048 Game',
    description: '2048 Game',
    url: './public/2048_game/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 38',
    name: 'Github Profile Finder',
    description: 'Github Profile Finder',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/github_profile_finder',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 39',
    name: 'Notes App',
    description: 'Notes App',
    url: './public/notes-app/index.html',
    tags: ['todo', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 40',
    name: 'Analog Clock',
    description: 'Analog Clock',
    url: './public/AnalogClock/index.html',
    tags: ['javascript', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 41',
    name: 'Scroll Dark Game',
    description: 'Scroll Dark Game',
    url: './public/Scroll%20Game%20Dark%20Run/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 42',
    name: 'Amazon App',
    description: 'Amazon App',
    url: './public/Amazon_Clone/index.html',
    tags: ['clone', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 43',
    name: 'Password Generator',
    description: 'Password Generator',
    url: './public/Password_Generator/index.html',
    tags: ['tool', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 44',
    name: 'BMI Calculator',
    description: 'BMI Calculator',
    url: './public/BMI_Calculator/index.html',
    tags: ['tool', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 45',
    name: 'Black Jack',
    description: 'Black Jack',
    url: './public/BlackJack/blackJ.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 46',
    name: 'Palindrome Generator',
    description: 'Palindrome Generator',
    url: './public/Palindrome_Generator/index.html',
    tags: ['javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 47',
    name: 'Ping Pong Game',
    description: 'Ping Pong Game',
    url: './public/ping/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 48',
    name: 'TextToVoiceConverter',
    description: 'TextToVoiceConverter',
    url: './public/TextToVoiceConverter/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 49',
    name: 'Url Shortener',
    description: 'Url Shortener',
    url: 'https://github.com/chandankoranga02/100_days_100_web_project/tree/Main/public/url_shortener',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 50',
    name: 'Recipe Genie',
    description: 'Recipe Genie',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/Recipe%20Genie',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 51',
    name: 'Netflix Landing Page Clone',
    description: 'Netflix Landing Page Clone',
    url: './public/Netflix_Cloning/Index.html',
    tags: ['clone', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 52',
    name: 'ClimaCode',
    description: 'ClimaCode',
    url: './public/ClimaCode%202.0/index.html',
    tags: ['weather', 'api'],
    category: 'intermediate'
  },
  {
    day: 'Day 53',
    name: 'E-Commerce Website with Simple Cart Functionality',
    description: 'E-Commerce Website with Simple Cart Functionality',
    url: './public/e-commerce_cart/index.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 54',
    name: 'Budget Tracker',
    description: 'Budget Tracker',
    url: './public/Budget%20Tracker/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 55',
    name: 'Cricket Game',
    description: 'Cricket Game',
    url: './public/cricket/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 56',
    name: 'Pastebin using svelte',
    description: 'Pastebin using svelte',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/pastebin',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 57',
    name: 'Glowing Social Media Icons',
    description: 'Glowing Social Media Icons',
    url: './public/Social%20Media%20Glowing/index.html',
    tags: ['ui', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 58',
    name: 'Music App',
    description: 'Music App',
    url: './public/Music%20App/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 59',
    name: 'Blog Page',
    description: 'Blog Page',
    url: './public/Blog%20Page/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 60',
    name: 'Marketing template website',
    description: 'Marketing template website',
    url: './public/marketing_website/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 61',
    name: 'Hologram Button',
    description: 'Hologram Button',
    url: './public/Holo%20Button/index.html',
    tags: ['ui', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 62',
    name: 'Solar System Explorer',
    description: 'Solar System Explorer',
    url: './public/Solar%20System%20Explorer%20in%20CSS%20only%20haml/template.html',
    tags: ['css'],
    category: 'intermediate'
  },
  {
    day: 'Day 63',
    name: 'Image to Text App',
    description: 'Image to Text App',
    url: './public/Image-To-Text-App/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 64',
    name: 'Zomato-clone',
    description: 'Zomato-clone',
    url: './public/zomato-clone/zomato.html',
    tags: ['clone', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 65',
    name: 'The Cube',
    description: 'The Cube',
    url: './public/The%20Cube/index.html',
    tags: ['ui', 'canvas', 'css'],
    category: 'intermediate'
  },
  {
    day: 'Day 66',
    name: 'Flask Authentication App',
    description: 'Flask Authentication App',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/flask_auth_app',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 67',
    name: 'Blog-Website',
    description: 'Blog-Website',
    url: './public/blog/main.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 68',
    name: '3d Rotating Card',
    description: '3d Rotating Card',
    url: './public/3d%20cards/index.html',
    tags: ['ui', 'css'],
    category: 'intermediate'
  },
  {
    day: 'Day 69',
    name: 'Spotify Clone Project',
    description: 'Spotify Clone Project',
    url: './public/spotify-clone%20-project/index.html',
    tags: ['clone', 'api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 70',
    name: 'Insect-Catch_Game',
    description: 'Insect-Catch_Game',
    url: './public/Insect-Catch-Game/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 71',
    name: 'Quotely Laughs',
    description: 'Quotely Laughs',
    url: './public/Quotely-Laughs/index.html',
    tags: ['api', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 72',
    name: 'Contact Book',
    description: 'Contact Book',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/Contact%20Book',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 73',
    name: 'Candy_Crush_Game',
    description: 'Candy_Crush_Game',
    url: './public/Candy_Crush_Game/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 74',
    name: 'Stock Profit Calculator',
    description: 'Stock Profit Calculator',
    url: './public/Stock-Profit-Calculator/index.html',
    tags: ['tool', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 75',
    name: 'code-space-game project',
    description: 'code-space-game project',
    url: './public/code-jump-space-game/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 76',
    name: 'Animated Searchbar',
    description: 'Animated Searchbar',
    url: './public/Animated%20Searchbar/index.html',
    tags: ['ui', 'css', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 77',
    name: 'Rock-Paper-Scissor-game project',
    description: 'Rock-Paper-Scissor-game project',
    url: './public/Stone-Paper-Scissor/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 78',
    name: 'NPM Package Search',
    description: 'NPM Package Search',
    url: './public/NPM%20Package%20Search/index.html',
    tags: ['tool', 'api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 79',
    name: 'Linkedin Homepage Clone',
    description: 'Linkedin Homepage Clone',
    url: './public/Linkedin-Clone/index.html',
    tags: ['clone', 'css'],
    category: 'intermediate'
  },
  {
    day: 'Day 80',
    name: 'Resume Studio',
    description: 'Resume Studio',
    url: './public/ResumeStudio/index.html',
    tags: ['tool', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 81',
    name: 'Simon Says Game',
    description: 'Simon Says Game',
    url: './public/Simon_Says_Game/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 82',
    name: 'Love Calculator Game',
    description: 'Love Calculator Game',
    url: './public/Love-Calculator/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 83',
    name: 'Exchange Currency',
    description: 'Exchange Currency',
    url: './public/Exchange_Currency/index.html',
    tags: ['tool', 'api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 84',
    name: 'Lights Out Puzzle',
    description: 'Lights Out Puzzle',
    url: './public/Lights_Out_Puzzle/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 85',
    name: 'Image Search Engine',
    description: 'Image Search Engine',
    url: './public/Image Search Engine/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 86',
    name: 'Profile Card',
    description: 'Profile Card',
    url: './public/3d profile Card/index.html',
    tags: ['ui', 'css'],
    category: 'beginner'
  },
  {
    day: 'Day 87',
    name: 'Breakout game',
    description: 'Breakout game',
    url: './public/Breakout game/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 88',
    name: 'Job dashboard',
    description: 'Job dashboard',
    url: './public/Job dashboard/jobs.html',
    tags: ['tool', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 89',
    name: 'N-Queen',
    description: 'N-Queen',
    url: './public/N_Queen/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 90',
    name: 'Quiz App Timer',
    description: 'Quiz App Timer',
    url: './public/QuizeApp Timer/index1.html',
    tags: ['javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 91',
    name: 'Voting Application Backend',
    description: 'Voting Application Backend',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/Voting_Application_Backend',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 92',
    name: 'Slide puzzle Game',
    description: 'Slide puzzle Game',
    url: './public/Slide puzzle Game/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 93',
    name: 'TextUtils',
    description: 'TextUtils',
    url: 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/Textutils',
    tags: ['javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 94',
    name: 'Hangman Game',
    description: 'Hangman Game',
    url: './public/HangmanGame/index.html',
    tags: ['game', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 95',
    name: 'TodoList in React TS Tailwind',
    description: 'TodoList in React TS Tailwind',
    url: './public/TodoList-React-TS-Tailwind/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 96',
    name: 'HCL Color Generator',
    description: 'HCL Color Generator',
    url: './public/HCL Color Generator/index.html',
    tags: ['ui', 'css', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 97',
    name: 'Time Capsule',
    description: 'Time Capsule',
    url: './public/Time-Capsule/index.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 98',
    name: 'Virtual Piano',
    description: 'Virtual Piano',
    url: './public/Virtual_Piano/index.html',
    tags: ['css', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 99',
    name: 'NASA-APOD Extension',
    description: 'NASA-APOD Extension',
    url: './public/NASA-APOD/popup.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 100',
    name: 'Text Saver Extension',
    description: 'Text Saver Extension',
    url: './public/Text_Saver_Ext/popup.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 101',
    name: 'Personal Finance Tracker',
    description: 'Personal Finance Tracker',
    url: './public/FinanceTracker/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 102',
    name: 'Travel Booking Website',
    description: 'Travel Booking Website',
    url: './public/Travel_booking_website/index.html',
    tags: ['javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 103',
    name: 'Drumkit Game',
    description: 'Drumkit Game',
    url: './public/Drumkit_Game/index.html',
    tags: ['game', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 104',
    name: 'Debug-Website',
    description: 'Debug-Website',
    url: './public/Debug-Website/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 105',
    name: 'Periodic Table',
    description: 'Periodic Table',
    url: './public/Periodic Table/index.html',
    tags: ['css', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 106',
    name: 'Plants Website',
    description: 'Plants Website',
    url: './public/Plants Website/index.html',
    tags: ['css'],
    category: 'beginner'
  },
  {
    day: 'Day 107',
    name: 'DocNow',
    description: 'DocNow',
    url: './public/DocNow/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 108',
    name: 'expense_Tracker',
    description: 'expense_Tracker',
    url: './public/expense_Tracker/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 109',
    name: 'Mood Tracker',
    description: 'Mood Tracker',
    url: './public/Mood Tracker/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 110',
    name: 'CRYPTOSHOW',
    description: 'CRYPTOSHOW',
    url: './public/CRYPTOSHOW/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 111',
    name: 'Whack-a-Mole Game',
    description: 'Whack-a-Mole Game',
    url: './public/Whack-a-Mole Game/index.html',
    tags: ['game', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 112',
    name: 'Nykaa Clone Website',
    description: 'Nykaa Clone Website',
    url: './public/Nykaa-clone/index.html',
    tags: ['clone', 'css'],
    category: 'intermediate'
  },
  {
    day: 'Day 113',
    name: 'CPU Scheduler',
    description: 'CPU Scheduler',
    url: './public/CpuScheduler/index.html',
    tags: ['tool', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 114',
    name: 'EchoNotes',
    description: 'EchoNotes',
    url: './public/EchoNotes/index.html',
    tags: ['todo', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 115',
    name: 'Event Registration System',
    description: 'Event Registration System',
    url: 'https://event-registration-system-w10a.onrender.com/',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 116',
    name: 'AI Image Classifier',
    description: 'AI Image Classifier',
    url: './public/AI Image Classifier/index.html',
    tags: ['api', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 117',
    name: 'Habit Tracker Web App',
    description: 'Habit Tracker Web App',
    url: './public/Habit-Tracker-Web-App/index.html',
    tags: ['ui', 'tool', 'html', 'css', 'js'],
    category: 'intermediate'
  },
  {
    day: 'Day 118',
    name: 'Particle Effect',
    description: 'Particle Effect',
    url: './public/image-particle-engine/index.html',
    tags: ['ui', 'html', 'css', 'js', 'canvas'],
    category: 'intermediate'
  },
  {
    day: 'Day 119',
    name: 'Virtual Playground',
    description: 'Virtual Playground',
    url: './playground.html',
    tags: ['ui', 'game', 'html', 'css', 'js'],
    category: 'intermediate'
  },
  {
    day: 'Day 120',
    name: 'Typing Speed Test',
    description: 'Typing Speed Test',
    url: './public/typing_test/index.html',
    tags: ['html', 'css', 'js', 'game'],
    category: 'intermediate'
  },
  {
    day: 'Day 121',
    name: 'InterviewSimulator',
    description: 'InterviewSimulator',
    url: './public/InterviewSimulator/index.html',
    tags: ['tool'],
    category: 'intermediate'
  },
  {
    day: 'Day 122',
    name: 'AstronomyDashboard',
    description: 'AstronomyDashboard',
    url: './public/AstronomyDashboard/astro.html',
    tags: ['html', 'css', 'javascript', 'api-javascript'],
    category: 'Advanced'
  },
  {
    day: 'Day 123',
    name: 'Pomodoro Timer',
    description: 'Pomodoro Timer',
    url: './public/Pomodoro_Timer/index.html',
    tags: ['productivity', 'tool'],
    category: 'intermediate'
  },
  {
    day: 'Day 124',
    name: 'Hurdle Highway 2D',
    description: 'Hurdle Highway 2D',
    url: './public/Hurdle_Highway_2D/index.html',
    tags: ['game'],
    category: 'intermediate'
  },
  {
    day: 'Day 125',
    name: 'Snakeladder',
    description: 'Snakeladder',
    url: './public/Snakeladder/index.html',
    tags: ['game'],
    category: 'intermediate'
  },
  {
    day: 'Day 126',
    name: 'Temperature Converter',
    description: 'Temperature Converter',
    url: './public/TemperatureConverter/index.html',
    tags: ['tool', 'javascript'],
    category: 'beginner'
  },
  {
    day: 'Day 127',
    name: 'Particle Wave Animation',
    description: 'Particle Wave Animation',
    url: './public/Particle Wave Animation/index.html',
    tags: ['css', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 128',
    name: 'Reaction Time Test',
    description: 'Reaction Time Test',
    url: './public/reaction-time-tester/main.html',
    tags: ['animation', 'simulation', 'html', 'css', 'js', 'javascript'],
    category: 'intermediate'
  },
  {
    day: 'Day 129',
    name: 'YouTube Clone',
    description: 'YouTube Clone',
    url: './public/youtube clone/index.html',
    tags: ['Html', 'CSS'],
    category: 'beginner'
  }
];

// Alias for consistency
const PROJECTS = PROJECT_DATA;
console.log('PROJECTS defined:', PROJECTS.length, 'items');


/* ============================================================
   SOURCE CODE URL GENERATOR
   ============================================================ */
function getSourceUrl(url) {
  const trimmed = url.trim();
  if (trimmed.startsWith('http')) return trimmed; // Already a full GitHub link
  if (trimmed.startsWith('./')) {
    // Converts "./public/folder/index.html" to "public/folder"
    const folderPath = trimmed.substring(2, trimmed.lastIndexOf('/'));
    return `https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}/tree/Main/${folderPath}`;
  }
  return `https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}/tree/Main`;
}


/* ============================================================
   BOOKMARK + RECENT SYSTEM
============================================================ */

let bookmarkedProjects = JSON.parse(localStorage.getItem('bookmarkedProjects')) || [];
let recentProjects = JSON.parse(localStorage.getItem('recentProjects')) || [];

let showAllBookmarks = false;
let showAllRecent = false;

const INITIAL_VISIBLE_ITEMS = 3;

// Category labels mapping
const CATEGORY_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
};
console.log('CATEGORY_LABEL defined:', CATEGORY_LABEL);

/* ============================================================
   GITHUB REPO STATS
   ============================================================ */
async function fetchRepoStats() {
  try {
    const [repoRes, prRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${window.REPO_OWNER}/${window.REPO_NAME}`),
      fetch(`https://api.github.com/search/issues?q=repo:${window.REPO_OWNER}/${window.REPO_NAME}+type:pr+state:open`),
    ]);
    if (!repoRes.ok || !prRes.ok) throw new Error('Stats fetch failed');
    const repo = await repoRes.json();
    const prs = await prRes.json();

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = Number(val).toLocaleString();
    };
    set('starCount', repo.stargazers_count);
    set('forkCount', repo.forks_count);
    set('issueCount', repo.open_issues_count - prs.total_count);
    set('prCount', prs.total_count);
  } catch (e) {
    console.warn('GitHub stats unavailable:', e.message);
  }
}

function generateReadme() {
  try {
    const lines = [];
    lines.push('# 100 Days · 100 Web Projects');
    lines.push('A curated archive of frontend experiments — browse, fork, contribute.');
    lines.push('');
    lines.push('## Projects');
    PROJECTS.forEach(({day, name, url, tags, category: cat}) => {
      const safeUrl = url || '';
      lines.push(`- **${day} — ${name}** — ${safeUrl} — _${cat}_`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  } catch (e) {
    console.error('Failed to generate README:', e);
    alert('Could not generate README. See console for details.');
  }
}

/* ============================================================
   RENDER PROJECT GRID
   ============================================================ */
let activeFilter = 'all';
let activeSort = 'default';
let activeSort = 'default';
let searchQuery = '';

function renderGrid() {
  const grid = document.getElementById('projectGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  // Dynamically set items per page based on viewport width to match CSS column layouts synchronously
  const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
  if (width <= 768) {
    itemsPerPage = 6; // Mobile (1 column x 6 rows = 6 total)
  } else if (width <= 1024) {
    itemsPerPage = 6; // Tablet (2 columns x 3 rows = 6 total, no hanging cards!)
  } else {
    itemsPerPage = 9; // Laptop & Desktop (3 columns x 3 rows = 9 total)
  }

  // Filter projects by matching category chip and multi-term keyword search query
  const filtered = PROJECTS.filter(({day, name, url, tags, category: cat}) => {
    const matchesFilter = activeFilter === 'all' || (() => {
      const tagStr = (typeof tags === 'string' ? tags : '').toLowerCase();
      const nameStr = name.toLowerCase();
      const urlStr = url.toLowerCase();

      if (activeFilter === 'game') {
        return tagStr.includes('game') || tagStr.includes('canvas');
      }
      if (activeFilter === 'clone') {
        return nameStr.includes('clone') || urlStr.includes('clone') || urlStr.includes('cloning');
      }
      if (activeFilter === 'tool') {
        return tagStr.includes('tool') || tagStr.includes('todo') || tagStr.includes('calculator') || tagStr.includes('weather') || nameStr.includes('tracker') || nameStr.includes('generator') || nameStr.includes('converter') || nameStr.includes('validator') || nameStr.includes('saver') || nameStr.includes('utils');
      }
      if (activeFilter === 'ui') {
        return tagStr.includes('css') || tagStr.includes('canvas') || tagStr.includes('animation') || nameStr.includes('animation') || nameStr.includes('cursor') || nameStr.includes('effect') || nameStr.includes('slider');
      }
      if (activeFilter === 'api') {
        return tagStr.includes('api') || tagStr.includes('weather') || nameStr.includes('api') || nameStr.includes('fetch');
      }
      return false;
    })();

    // Split search query by spaces to support multi-term criteria (e.g. "day 1 todo")
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || q.split(/\s+/).every(term => 
      name.toLowerCase().includes(term) || 
      day.toLowerCase().includes(term) || 
      (typeof tags === 'string' && tags.toLowerCase().includes(term))
    );

    return matchesFilter && matchesSearch;
  });

  
  if (activeSort === 'category') {
    filtered.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
  } else {
    filtered.sort((a, b) => {
       const numA = parseInt((a.day || '').replace(/\D/g, ''), 10) || 0;
       const numB = parseInt((b.day || '').replace(/\D/g, ''), 10) || 0;
       return numA - numB;
    });
  }
  const totalPages = Math.ceil(filtered.length / itemsPerPage);


  // If a filter chip shrinks the results, reset current page index to avoid out-of-bounds
  if (currentPage > totalPages) {
    currentPage = Math.max(1, totalPages);
  }

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
    const container = document.getElementById('paginationContainer');
    if (container) container.innerHTML = '';
    return;
  }

  grid.style.display = 'grid';
  noResults.style.display = 'none';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filtered.slice(startIndex, endIndex);

  pageItems.forEach(({day, name, url, tags, category: cat}) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const isBookmarked = bookmarkedProjects.some((item) => item.day === day);
    const tagsArray = tags;
    const tagsHTML = tagsArray.map((t) => `<span class="tag">${t}</span>`).join('');
    const sourceUrl = getSourceUrl(url);

    card.innerHTML = `
            <div class="card-meta">
                <span class="card-day">${day}</span>
                <span class="card-category">${CATEGORY_LABEL[cat] || cat}</span>
            </div>
            <div class="card-name">${name}</div>
            <div class="card-tags">${tagsHTML}</div>
            <div class="card-footer">
                <div class="card-actions-left">
                    <a href="${url.trim()}" target="_blank" class="card-link open-project" data-id="${day}" rel="noopener noreferrer">
                        Demo <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="${sourceUrl}" target="_blank" class="card-link view-code-link" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
                <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${day}">
                    <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                </button>
            </div>
        `;

    grid.appendChild(card);
  });

  renderPagination(filtered.length, totalPages);
}

function renderPagination(totalItems, totalPages) {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  let container = document.getElementById('paginationContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'paginationContainer';
    container.className = 'pagination-container';
  }

  container.innerHTML = '';

  // If there is only 1 page of results, hide and detach the pagination block
  if (totalPages <= 1) {
    if (container.parentElement === grid) {
      grid.removeChild(container);
    }
    return;
  }

  // Render showing info range (e.g. "Showing 1 to 9 of 100")
  const infoDiv = document.createElement('div');
  infoDiv.className = 'pagination-info';
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  infoDiv.innerHTML = `Showing <strong>${startItem}</strong> to <strong>${endItem}</strong> of <strong>${totalItems}</strong> projects`;
  container.appendChild(infoDiv);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'pagination-controls';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev-btn';
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute('aria-label', 'Previous Page');
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderGrid();
      // Delay scrolling by 50ms to allow DOM layout to recalculate and stabilize after cards redraw
      setTimeout(() => {
        scrollToProjectSection();
      }, 50);
    }
  });
  controlsDiv.appendChild(prevBtn);

  // Initialize bounds for numeric pagination window (displays maximum of 4 page buttons)
  let startPage = 1;
  let endPage = totalPages;
  const maxVisible = 4;

  // Sliding window pagination logic centering the active page
  if (totalPages > maxVisible) {
    if (currentPage <= 2) {
      startPage = 1;
      endPage = 4;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-num ${currentPage === i ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.setAttribute('aria-label', `Page ${i}`);
    pageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      renderGrid();
      // Delay scrolling by 50ms to allow DOM layout to recalculate and stabilize after cards redraw
      setTimeout(() => {
        scrollToProjectSection();
      }, 50);
    });
    controlsDiv.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute('aria-label', 'Next Page');
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderGrid();
      // Delay scrolling by 50ms to allow DOM layout to recalculate and stabilize after cards redraw
      setTimeout(() => {
        scrollToProjectSection();
      }, 50);
    }
  });
  controlsDiv.appendChild(nextBtn);

  container.appendChild(controlsDiv);
  
  // Append container dynamically inside the projectGrid element to keep it attached
  grid.appendChild(container);
}

function scrollToProjectSection() {
  const header = document.querySelector('.projects-header');
  if (!header) return;

  const navbar = document.querySelector('.navbar');
  // Subtract height of fixed navbar with a 50px buffer to prevent overlaying the search bar
  const offset = navbar ? navbar.offsetHeight - 50 : 30;
  const targetY = header.getBoundingClientRect().top + window.pageYOffset - offset;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  
  // Custom snappy scroll duration (100ms matches the quick transitions in your CSS)
  const duration = 100; 
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    // Cap scroll position math exactly to distance to avoid landing slightly off target
    const run = easeInOutQuad(Math.min(timeElapsed, duration), startY, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Mathematical Quadratic Ease-In-Out formula for momentum-like deceleration
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

function toggleBookmark(project) {
  const exists = bookmarkedProjects.find((item) => item.day === project.day);

  if (exists) {
    bookmarkedProjects = bookmarkedProjects.filter((item) => item.day !== project.day);
    showToast('Bookmark removed');
  } else {
    bookmarkedProjects.push(project);
    showToast('Project bookmarked');
  }

  localStorage.setItem('bookmarkedProjects', JSON.stringify(bookmarkedProjects));
  renderBookmarks();
  renderGrid();
  renderRecentProjects();
}

function trackRecentProject(project) {
  recentProjects = recentProjects.filter((item) => item.day !== project.day);
  recentProjects.unshift(project);

  if (recentProjects.length > 10) {
    recentProjects.pop();
  }

  localStorage.setItem('recentProjects', JSON.stringify(recentProjects));
  renderRecentProjects();
}

const bookmarkGrid = document.getElementById('bookmarkGrid');

function renderBookmarks() {
  if (!bookmarkGrid) return;

  bookmarkGrid.innerHTML = '';

  if (bookmarkedProjects.length === 0) {
    bookmarkGrid.innerHTML = `<p class="empty-state">No bookmarked projects yet.</p>`;
    return;
  }

  const bookmarkToggleBtn = document.getElementById('bookmarkToggleBtn');
  if (bookmarkToggleBtn) {
    bookmarkToggleBtn.style.display = bookmarkedProjects.length <= INITIAL_VISIBLE_ITEMS ? 'none' : 'inline-flex';
  }

  const visibleBookmarks = showAllBookmarks ? bookmarkedProjects : bookmarkedProjects.slice(0, INITIAL_VISIBLE_ITEMS);

  visibleBookmarks.forEach(({day, name, url, tags, category: cat}) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const tagsHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
    const sourceUrl = getSourceUrl(url);

    card.innerHTML = `
            <div class="card-meta">
                <span class="card-day">${day}</span>
                <span class="card-category">${CATEGORY_LABEL[cat]}</span>
            </div>
            <div class="card-name">${name}</div>
            <div class="card-tags">${tagsHTML}</div>
            <div class="card-footer">
                <div class="card-actions-left">
                    <a href="${url}" target="_blank" class="card-link open-project" data-id="${day}">
                        Demo <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="${sourceUrl}" target="_blank" class="card-link view-code-link" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
                <button class="bookmark-btn active" data-id="${day}">
                    <i class="fa-solid fa-bookmark"></i>
                </button>
            </div>
        `;

    bookmarkGrid.appendChild(card);
  });
}

const recentGrid = document.getElementById('recentGrid');

function renderRecentProjects() {
  if (!recentGrid) return;

  recentGrid.innerHTML = '';

  if (recentProjects.length === 0) {
    recentGrid.innerHTML = `<p class="empty-state">No recently viewed projects.</p>`;
    return;
  }

  const recentToggleBtn = document.getElementById('recentToggleBtn');
  if (recentToggleBtn) {
    recentToggleBtn.style.display = recentProjects.length <= INITIAL_VISIBLE_ITEMS ? 'none' : 'inline-flex';
  }

  const visibleRecent = showAllRecent ? recentProjects : recentProjects.slice(0, INITIAL_VISIBLE_ITEMS);

  visibleRecent.forEach(({day, name, url, tags, category: cat}) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const tagsHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
    const isBookmarked = bookmarkedProjects.some((item) => item.day === day);
    const sourceUrl = getSourceUrl(url);

    card.innerHTML = `
            <div class="card-meta">
                <span class="card-day">${day}</span>
                <span class="card-category">${CATEGORY_LABEL[cat]}</span>
            </div>
            <div class="card-name">${name}</div>
            <div class="card-tags">${tagsHTML}</div>
            <div class="card-footer">
                <div class="card-actions-left">
                    <a href="${url}" target="_blank" class="card-link open-project" data-id="${day}">
                        Demo <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="${sourceUrl}" target="_blank" class="card-link view-code-link" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
                <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${day}">
                    <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                </button>
            </div>
        `;

    recentGrid.appendChild(card);
  });
}

/* ============================================================
   VIEW ALL TOGGLE
   ============================================================ */

const bookmarkToggleBtn = document.getElementById('bookmarkToggleBtn');
const recentToggleBtn = document.getElementById('recentToggleBtn');

if (bookmarkToggleBtn) {
  bookmarkToggleBtn.addEventListener('click', () => {
    showAllBookmarks = !showAllBookmarks;
    bookmarkToggleBtn.textContent = showAllBookmarks ? 'Show Less' : 'View All';
    renderBookmarks();
  });
}

if (recentToggleBtn) {
  recentToggleBtn.addEventListener('click', () => {
    showAllRecent = !showAllRecent;
    recentToggleBtn.textContent = showAllRecent ? 'Show Less' : 'View All';
    renderRecentProjects();
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('click', (e) => {
  const bookmarkBtn = e.target.closest('.bookmark-btn');
  if (!bookmarkBtn) return;

  e.preventDefault();
  const projectDay = bookmarkBtn.dataset.id;
  const project = PROJECTS.find((item) => item.day === projectDay);
  toggleBookmark(project);
});

document.addEventListener('click', (e) => {
  const projectLink = e.target.closest('.open-project');
  if (!projectLink) return;

  const projectDay = projectLink.dataset.id;
  const project = PROJECTS.find((item) => item.day === projectDay);
  if (!project) return;

  trackRecentProject(project);
});

/* ============================================================
   FILTER CHIPS
   ============================================================ */
function initFilterChips() {
  const chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      currentPage = 1;
      renderGrid();
    });
  });
}

/* ============================================================
   LIVE SEARCH
   ============================================================ */
function initSearch() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      currentPage = 1;
      renderGrid();
    });
  }
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    currentPage = 1;
    renderGrid();
  });
}

function syncProjectCounts() {
  const total = PROJECTS.length.toLocaleString();
  const countNodes = [document.getElementById('projectCount'), document.getElementById('allCount')];

  countNodes.forEach((node) => {
    if (node) node.textContent = total;
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = `Search ${total} projects…`;
  }
}

/* ============================================================
   NAVBAR — dynamic based on login state
   ============================================================ */
function updateNavbar() {
  const container = document.getElementById('navButtons');
  if (!container) return;

    const username = window.username || null;
    const isRoot   = !window.location.pathname.includes('/contributors/');
    const base     = isRoot ? '' : '../';
    const isLight  = document.body.classList.contains('light-mode');
    const themeButton = `
            <button class="btn btn-ghost btn-sm" id="themeToggleNav" aria-label="Toggle theme">
                <i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
        `;

    if (username) {
        container.innerHTML = `
            ${themeButton}
            <span class="welcome-text">Hi, ${username}</span>
            <button class="btn btn-ghost btn-sm" id="logoutBtn">Log out</button>
            <button class="btn btn-ghost btn-sm" id="generateReadmeBtn">Generate README</button>
            <a class="btn btn-ghost btn-sm" href="https://github.com/dhairyagothi/100_days_100_web_project" target="_blank">
                <i class="fab fa-github"></i> GitHub
            </a>
            <a class="btn btn-ghost btn-sm" href="${base}contributors/contributor.html">Contributors</a>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            window.username = null;
            updateNavbar();
        });
        const gen = document.getElementById('generateReadmeBtn');
        if (gen) gen.addEventListener('click', generateReadme);
    } else {
        container.innerHTML = `
            ${themeButton}
            <a class="btn btn-ghost btn-sm" href="${base}contributors/contributor.html">Contributors</a>
            <a class="btn btn-ghost btn-sm" href="https://github.com/dhairyagothi" target="_blank">
                <i class="fab fa-github"></i> GitHub
            </a>
            <button class="btn btn-ghost btn-sm" id="generateReadmeBtn">Generate README</button>
            <a class="btn btn-primary btn-sm" href="${base}public/Login.html">Sign in</a>
        `;
    const gen2 = document.getElementById('generateReadmeBtn');
    if (gen2) gen2.addEventListener('click', generateReadme);
  }
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    let transitionTimer = null;

    const syncThemeIcons = () => {
        const isLight = document.body.classList.contains('light-mode');
        const iconClass = isLight ? 'fas fa-sun' : 'fas fa-moon';
        document.querySelectorAll('#themeToggle i, #themeToggleNav i').forEach(icon => {
            icon.className = iconClass;
        });
    };

    if (saved === 'light') {
        document.body.classList.add('light-mode');
    }
    syncThemeIcons();

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('#themeToggle') || e.target.closest('#themeToggleNav');
        if (!target) return;

        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        syncThemeIcons();

        document.body.classList.add('theme-transitioning');
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 400);
    });
}

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
function initScrollBtn() {
  const btn = document.getElementById('scrollBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  console.log('PROJECTS:', typeof PROJECTS, PROJECTS ? PROJECTS.length : 'undefined');
  initTheme();
  updateNavbar();
  initFilterChips();
  initSearch();
  syncProjectCounts();
  renderGrid();
  renderBookmarks();
  renderRecentProjects();
  fetchRepoStats();
  initScrollBtn();
});

// Re-render the grid when the browser window is resized to adapt pagination density instantly
window.addEventListener('resize', () => {
  renderGrid();
});
