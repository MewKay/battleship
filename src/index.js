import "./styles/style.css";
import "./styles/reset.css";
import gameTitle from "./ui/gameTitle";
import gameContent from "./ui/gameContentDisplay";
import GameHandler from "./app-logic/GameHandler";

GameHandler.newGame();
document.body.appendChild(gameTitle());
document.body.appendChild(gameContent());
