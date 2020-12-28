import React, {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo } from '../redux';

const UserInput = () => {

    const [userName, setName] = useState("");
    const [isSum, setIsSum] = useState(false);

    const currUser = useSelector((state) => state.user.userInfoObj)
    const dispatch = useDispatch();

    let setUserName = (e) => {
        if(e.target.value.length > 0){
            setName(e.target.value);
        }
    }

    let setPlayerInfo = () => {
        if(userName.length > 0){
            dispatch(setUserInfo({
                player: userName,
                points: 0,
                distance: Math.floor(Math.random() * (100 - 5) + 5)
            }));
            setIsSum(true);
        }
    }

    const resetPlayer = () => {
        setName("");
        setIsSum(false);
    }

    return (
        <div className="user-form-input">
            {
                isSum ? 
                <div>
                    <h1>Player Info Summary</h1>
                    <hr />
                    <h2>Player Name: {currUser.player}</h2>
                    <h3>Your Distance from nearest Sweet Shop: {currUser.distance}</h3>
                    <hr />
                    <h4>If you're happy with this, press "Continue", else "Reset"</h4>
                    <button onClick={resetPlayer}>Reset</button>
                    <button>Continue</button>
                </div> :
                <div>
                    <h1>Player Info Input</h1>
                    <hr />
                    <label>
                        Please Input Your Name:
                        <input onInput={setUserName}></input>
                    </label>
                    <button onClick={setPlayerInfo}>Save Name?</button>
                </div>
            }
        </div>
    );
};

export default UserInput;