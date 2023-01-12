import React, {useEffect, useState} from 'react';
import {Board} from "../components/Board";
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr";

const GamePage = () => {
    const [connection, setConnection] = useState<HubConnection>();
    
    useEffect(() => {
        const cnct =  () => {
            setConnection(configureConnection());
        }
        cnct();
    }, [])
    
    const configureConnection = () => {
        const connection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_ORIGIN_WEB_API + '/game')
            .build();
        
        try {
            connection.start().then(async () => {
                connection.on('ReceiveMessage', (message) => {
                    alert(message)
                });
            });
        }
        catch (err) {
            console.log(err);
        }

        return connection;
    }
    
    return (
            <div className={"tic-tac-toe-container"}>
                <Board squaresInRow={3} connection={connection}></Board>
            </div>
    );
};

export default GamePage;