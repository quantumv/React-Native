import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

function RenderMission({mission}) {
    if (mission) {
        return (
            <Card
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            The community partnership in
            >
            </Card>
        );
    }
}

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
        const { navigate } = this.props.navigation;
        const renderPartnerItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={'./images/bootstrap-logo.png'}
                />
            );
        };
        return(
            <ScrollView>
                <RenderMission />
                <Card title="Community Partners">
                    <FlatList 
                        data={this.state.mission}
                        renderItem={renderPartnerItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default About;