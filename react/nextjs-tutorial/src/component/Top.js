import {Header} from 'semantic-ui-react';
import Gnb from './Gnb.js';

export default function Top() {
    return (
        <div>
            <img src="/images/matthew.jpg" alt="logo"/>
            <Header as="h1">매튜</Header>
            <Gnb />
        </div>
    );
}
