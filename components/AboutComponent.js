import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PARTNERS } from '../shared/partners';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title:' About Us'
    };

    render() {
        return(
            <ScrollView />
        );
    }
}

export default About;