import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
//Exercise: Social Sharing Week:4- step:1 add Share to react-native

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => postComment(campsiteId, rating, author, text)
};

// Exercise: Gestures Part 1: Week 3: first import PanResponder into React-Native 
function RenderCampsite(props) {
    
    const { campsite } = props;

    const view = React.createRef();

    const recognizeComment = ({dx}) => (dx < -200) ? true : false;

    // Exercise: Gestures Part 1: Week 3 step:1 setup function recognizeDrag as arrow function
    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

    // Exercise: Gestures Part 1: Week 3 step:2 setup PanResponders API
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        //added in Week 3 Workshop
        onPanResponderGrant: () => {
        view.current.rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
    },
        onPanResponderEnd: (e, gestureState) => {
        console.log('pan responder end', gestureState);

        // Exercise: Gestures Part 1: Week 3 step:3 setup an alert
        if (recognizeDrag(gestureState)) {
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + campsite.name + 'to favorites?',
                
                //these are the buttons
                [
                    {
                        text: 'Cancel',
                        styles: 'cancel',
                        onPress: () => console.log('Cancel Pressed')
                    },
                    {
                        text: 'Ok',
                        onPress: () => props.favorite ? 
                        console.log('Already set as favorite') : props.markFavorite()
                    },
                ],
                { cancelable: false }
            );
            
            //added in Week 3 Workshop
        } else if(recognizeComment(gestureState)) {
            props.onShowModal()
        }
        return true;
    }
});

//Exercise: Social Sharing Week:4- step:2  implemented inner function 
//NOTE: the share method takes up to two arguments first object required is for the content being shared, second method optional.
const shareCampsite = (title, message, url) => {
    Share.share({
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url
    },{
        dialogTitle: 'Share ' + title
    });
};

// Exercise: Gestures Part 1: Week 3 step:4 added {...panHandlers...} prop, us the spreads sytacxs to spread out the panHandlers panResponders. This is wrapped around the <Card>.
    if (campsite) {
        return (
            <Animatable.View 
            animation='fadeInDown' 
            duration={2000} 
            delay={1000}
            ref={view} 
            {...panResponder.panHandlers}>
                <Card
                    featuredTitle={campsite.name}
                    image={{ uri: baseUrl + campsite.image }}>
                    <Text style={{ margin: 10 }}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                    
                    {/* This is the Heart */}
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()}
                        />
                    
                    {/* This is the pencil */}
                        <Icon style={styles.cardItem}
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                {/*Exercise: Social Sharing Week:4- step:3 add share Icon */}
                    {/* This is the share */}
                         <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#5637DD'
                            style={styles.cardItem}
                            raised
                            reversed
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)} 
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}
   
function RenderComments({ comments }) {
    const renderCommentItem = ({ item }) => {
        return (
            <View 
            style={{ margin: 10 }}
            >
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={5}
                    style={{ alignItems: 'flex-start', padding: 5 }}
                    imageSize={10}
                    readOnly
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        )
    };

    return (
        <Animatable.View 
        animation='fadeInUp' 
        duration={2000} 
        delay={1000}>
            <Card title='Comments'>
                <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}
class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(campsiteId) {
        this.toggleModal();
        this.props.postComment(
            campsiteId, 
            this.state.rating,
            this.state.author,
            this.state.text
        )
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        });
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite 
                    campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments}/> 
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <Rating
                        showRating
                        type='star'
                        startingValue={this.state.rating}
                        imageSize={40}
                        onFinishRating={(rating) => this.setState({ rating: rating })}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon='user-o'
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChange={(author) => this.setState({author: author})}
                        value={this.state.author}
                    />
                    <Input
                        placeholder='Comments'
                        leftIcon='comment-o'
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChange={(text) => this.setState({text: text})}
                        value={this.state.text}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                this.handleComment(campsiteId);
                                this.resetForm();
                            }}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            title='Cancel'
                            color='#808080'
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                        />
                    </View>
                    
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
