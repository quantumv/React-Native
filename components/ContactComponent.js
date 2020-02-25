import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
// Exercise: Sending Email Week:4- step:1 added Button and Icon to elements as well as MailComposer


class Contact extends Component {
    static navigationOption = {
        title: 'Contact Us'
    }

    // Exercise: Sending Email Week:4- step:2 configure a method sendMail
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
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
                        {/*Exercise: Sending Email Week:4- step:3 adding a button that will call the sendMail method */}
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#5637DD', margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;