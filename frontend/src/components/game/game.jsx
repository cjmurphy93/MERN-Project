import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import JoinGame from './join_game';
import io from 'socket.io-client';
import "./game.css";

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      socket: null,
      gameName: "",
      stage: 1,
    };
    this.scoket = null;
    this.handleJoin = this.handleJoin.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const HOST =
      process.env.NODE_ENV === "production"
        ? "https://rpskill.herokuapp.com/"
        : "http://localhost:5000";
        
    this.socket = io(HOST);
    
    this.socket.on("connect", (socket) => {

      this.socket.on("gameData", (gameData) => {
        console.log(gameData);
        debugger;
      });

      this.socket.on("game start", () => {
        debugger;
        this.setState({ stage: 3 });
      });
    })
    //emit "join" username
  }

  update(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleJoin(e){
    e.preventDefault();

    const username = this.state.user.username
    const game = this.state.gameName;
    debugger;
    this.socket.emit("join", {username, game}, (error) => {
        if (error) {
            alert(error);
        }
    });
    this.setState({stage: 2});
  }

  componentWillUnmount() {
    //disconnect socket
  }

  render() {
      const { stage, gameName} = this.state;


      let display;
        if (stage === 1){
             display = <JoinGame gameName={gameName}update={this.update} handleJoin={this.handleJoin}/>
        } else if (stage===2) {
             display = <WaitingRoom />
        } else if (stage===3) {
             display = <LiveGame />
        }
    return (
      <div>
     {display}
      </div>
    );
  }
}

export default GameRoom;

