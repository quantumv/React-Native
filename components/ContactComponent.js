import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    static navigationOption = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card 
                        title="Contact Information"
                        wrapperStyle={{margin: 20}}>
                        <Text style={{margin: 10}}>
                             1 Nucamp Way
                             Seattle, WA 98001
                             U.S.A.
                             Phone: 1-206-555-1234
                             Email: campsites@nucamp.co
                        </Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;