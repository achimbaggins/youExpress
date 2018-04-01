/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Button,
  ToastAndroid,
  UIManager,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  PixelRatio,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DialogProgress from 'react-native-dialog-progress';

const { width, height } = Dimensions.get('window')

export default class youexpress extends Component {
  constructor(props){
    super(props)
    this.state = {
      photoSource: '',
      senderForm: true,
      receiverForm1: false,
      receiverForm2: false,
      receiverForm3: false,
      responsible:[{payBy: 'Sender'},{payBy: 'Receiver'}],
      payWith:[
        {image:require('./src/images/ic_cash.png'), with: 'Cash'},
        {image:require('./src/images/ic_wallet.png'), with: 'Wallet'},
        {image:require('./src/images/ic_bill.png'), with: 'Billed'}
      ],
      initial: 0,
      initialPay:0
    };
  }

  componentWillMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      },
      chooseFromLibraryButtonTitle:''
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let Source = { uri: response.uri };
        this.setState({photoSource: response.uri});
      }
    });
  }
  proses(){
    DialogProgress.show({
      title         :null,
      message       :"Mohon Tunggu",
      isCancelable  :false
    })
    setTimeout(()=>{
      DialogProgress.hide()
      ToastAndroid.show('Hore !!! \n Order kamu udah berhasil dibuat loh', ToastAndroid.SHORT);
    },5000)
  }

  render() {
    let renderPayBy = this.state.responsible.map((data,index)=>{
      return(
              <TouchableOpacity
              onPress={()=>this.setState({initial:index})}
              key={index}
              >
                  <View style={styles.containerPayment}>
                      <View style={styles.left}>
                          <View style={this.state.initial !== index ? styles.unSelectedDot : styles.selectedDot}></View>
                      </View>
                      <View style={styles.right}>
                          <Text style={this.state.initial !== index ? styles.text : styles.textBold}>{data.payBy}</Text>
                      </View>
                  </View>
              </TouchableOpacity>
          )
      })
    let renderPayWith = this.state.payWith.map((data,index)=>{
      return(
              <TouchableOpacity
              onPress={()=>this.setState({initialPay:index})}
              key={index}
              >
                  <View style={styles.containerPayWith}>
                        <Image style={{width:40, height:40}} source={data.image}/>
                          <Text style={this.state.initialPay !== index ? styles.text : styles.textBold}>{data.with}</Text>
                      
                  </View>
              </TouchableOpacity>
          )
      })
    return (
      <View style={styles.container}>
        <View style={[{height:50},styles.boxTop]}>
          <Image style={{marginTop:3, width:20, height:20,}} source={require('./src/images/ic_back.png')}/>
          <Text style={{fontSize:16, fontWeight:'bold', margin:4,}}>Confirm Order</Text>
        </View>
        <ScrollView>
          <View style={styles.box}>
            <Text style={[styles.p, {flex: 1}]}>Your Package Photo </Text>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              { this.state.photoSource === ''
              ? (<View style={{backgroundColor:'#3b2685', borderRadius:50, padding:10, height:30, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20, color:'#ffffff'}}>+</Text>
                </View>)
              : (<View style={[styles.avatar, styles.avatarContainer, {marginTop: 5}]}>
                <Image style={styles.avatar} source={{uri: this.state.photoSource}} />
                </View>)
              }

            </TouchableOpacity>
              
          </View>
          <View style={styles.contact}>
            <Text style={styles.p}>Enter contact number (sender and receiver) and note for the driver</Text>
          {/* batas awal */}
          <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Image style={{marginTop:3, width:20, height:20}} source={require('./src/images/ic_from.png')}/>
              </View>
              <View style={{flex:9}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 18, color:'#3b2685', fontWeight:'bold', flex:1}}>Sender</Text>
                  <TouchableOpacity onPress={()=>{
                    let senderForm = !this.state.senderForm
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({senderForm})
                  }}>
                    <Image source={this.state.senderForm ? require('./src/images/ic_collapse.png') : require('./src/images/ic_expand.png')} style={{width:22, height: 15, flex:-1, margin:10}} />
                  </TouchableOpacity>
                </View>
                {/* kontak */}
                {this.state.senderForm
                ?
                (<View>
                  <Text style={{fontSize: 13, color:'#3b2685'}}>Alamat pengirim</Text>
                  <View>
                    <View style={styles.SectionStyle}>
                      <Image source={require('./src/images/ic_from_name.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Enter Your Name Here"
                          underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle}>
                      <Image source={require('./src/images/ic_from_phone.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Phone Number"
                          underlineColorAndroid="transparent"
                          keyboardType={'phone-pad'}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Notes, instructions or location details"
                          underlineColorAndroid="transparent"
                          keyboardType={'default'}
                      />
                    </View>
                  </View>
                </View>)
                :
                null}
                {/* kontak */}
              </View>

            </View>
          {/* batas akhir */}
          <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width}}/>
          {/* batas awal */}
          <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Image style={{marginTop:3, width:20, height:20}} source={require('./src/images/ic_to.png')}/>
              </View>
              <View style={{flex:9}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 18, color:'#7ea107', fontWeight:'bold', flex:1}}>Receiver 1</Text>
                  <TouchableOpacity onPress={()=>{
                    let receiverForm1 = !this.state.receiverForm1
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({receiverForm1})
                  }}>
                    <Image source={this.state.receiverForm1 ? require('./src/images/ic_collapse.png') : require('./src/images/ic_expand.png')} style={{width:22, height: 15, flex:-1, margin:10}} />
                  </TouchableOpacity>
                </View>
                {/* kontak */}
                {this.state.receiverForm1
                ?
                (<View>
                  <Text style={{fontSize: 13, color:'#7ea107'}}>Alamat Receiver 1</Text>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_name.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Enter Receiver Name Here"
                          underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_phone.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Phone Number"
                          underlineColorAndroid="transparent"
                          keyboardType={'phone-pad'}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Notes, instructions or location details"
                          underlineColorAndroid="transparent"
                          keyboardType={'default'}
                      />
                    </View>
                  </View>
                </View>)
                :
                null}
                {/* kontak */}
              </View>

            </View>
          {/* batas akhir */}
          <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width}}/>          
          {/* batas awal */}
          <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Image style={{marginTop:3, width:20, height:20}} source={require('./src/images/ic_to.png')}/>
              </View>
              <View style={{flex:9}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 18, color:'#7ea107', fontWeight:'bold', flex:1}}>Receiver 2</Text>
                  <TouchableOpacity onPress={()=>{
                    let receiverForm2 = !this.state.receiverForm2
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({receiverForm2})
                  }}>
                    <Image source={this.state.receiverForm2 ? require('./src/images/ic_collapse.png') : require('./src/images/ic_expand.png')} style={{width:22, height: 10, flex:-1, margin:10}} />
                  </TouchableOpacity>
                </View>
                {/* kontak */}
                {this.state.receiverForm2
                ?
                (<View>
                  <Text style={{fontSize: 13, color:'#7ea107'}}>Alamat Receiver 2</Text>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_name.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Enter Receiver Name Here"
                          underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_phone.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Phone Number"
                          underlineColorAndroid="transparent"
                          keyboardType={'phone-pad'}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Notes, instructions or location details"
                          underlineColorAndroid="transparent"
                          keyboardType={'default'}
                      />
                    </View>
                  </View>
                </View>)
                :
                null}
                {/* kontak */}
              </View>

            </View>
          {/* batas akhir */}
          <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width}}/>          
          {/* batas awal */}
          <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Image style={{marginTop:3, width:20, height:20}} source={require('./src/images/ic_to.png')}/>
              </View>
              <View style={{flex:9}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 18, color:'#7ea107', fontWeight:'bold', flex:1}}>Receiver 3</Text>
                  <TouchableOpacity onPress={()=>{
                    let receiverForm3 = !this.state.receiverForm3
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({receiverForm3})
                  }}>
                    <Image source={this.state.receiverForm3 ? require('./src/images/ic_collapse.png') : require('./src/images/ic_expand.png')} style={{width:22, height: 10, flex:-1, margin:10}} />
                  </TouchableOpacity>
                </View>
                {/* kontak */}
                {this.state.receiverForm3
                ?
                (<View>
                  <Text style={{fontSize: 13, color:'#7ea107'}}>Alamat Receiver 3</Text>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_name.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Enter Receiver Name Here"
                          underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <Image source={require('./src/images/ic_to_phone.png')} style={styles.ImageStyle} />
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Phone Number"
                          underlineColorAndroid="transparent"
                          keyboardType={'phone-pad'}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.SectionStyle2}>
                      <TextInput
                        placeholderTextColor={'#BFBFBF'}
                          style={{flex:10}}
                          placeholder="Notes, instructions or location details"
                          underlineColorAndroid="transparent"
                          keyboardType={'default'}
                      />
                    </View>
                  </View>
                </View>)
                :
                null}
                {/* kontak */}
              </View>

            </View>
          {/* batas akhir */}
          </View>
          <View style={styles.boxBawah}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <Text style={{color:'#000000', fontSize:13, fontWeight:'bold'}}>Price</Text>              
              </View>
              <View style={{flex:-1}}>
                <Text style={{color:'#000000', fontSize:13, fontWeight:'bold'}}>IDR 235.000</Text>              
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <Text style={{color:'#000000', fontSize:13, fontWeight:'bold'}}>Door to door (driver)</Text>              
              </View>
              <View style={{flex:-1}}>
                <Text style={{color:'#000000', fontSize:13, fontWeight:'bold'}}>IDR 35.000</Text>              
              </View>
            </View>

            <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width*0.85}}/>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <Text style={{color:'#3b2685', fontSize:16, fontWeight:'bold'}}>Total Payment</Text>              
              </View>
              <View style={{flex:-1}}>
                <Text style={{color:'#3b2685', fontSize:20, fontWeight:'bold'}}>IDR 270.000</Text>              
              </View>
            </View>

            <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width}}/>  

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <Text style={{color:'#000000', fontSize:14, fontWeight:'bold'}}>Responsible Payment</Text>              
              </View>
            </View>
            <View style={{flexDirection:'row'}}>{renderPayBy}</View>

            <View style={{borderColor: '#DFDFDF', borderBottomWidth:0.5, margin:10, width: width}}/>  

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <Text style={{color:'#000000', fontSize:14, fontWeight:'bold'}}>Pay With</Text>              
              </View>
            </View>
            <View style={{flexDirection:'row'}}>{renderPayWith}</View>

            <TouchableOpacity onPress={()=>this.proses()}>
            <View style={{backgroundColor: '#5E50A1', marginTop:20, marginBottom:0, borderRadius:10, width:width*0.9, height:50, alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'#ffffff', fontWeight:'bold'}}>Order </Text>              
            </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E2E2E2',
    flexDirection: 'column',
    marginBottom:0
  },
  box:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginBottom: 5,
    marginTop:5,
    padding:10,
    borderRadius: 10,
    width: width*0.9
  },
  boxBawah:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:25,
    marginBottom: 5,
    width: width
  },
  boxTop:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:10,
    marginBottom: 5,
    width: width
  },
  contact:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginTop:5,
    marginLeft: 20,
    padding:10,
    borderRadius: 10,
    width: width*0.9
  },
  p: {
    fontSize: 15,
    color:'#3b2685'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  avatarContainer: {
    borderColor: '#5E50A1',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    borderWidth: .5,
    borderColor: '#5E50A1',
    height: 40,
    borderRadius: 5 ,
    marginTop: 5
},
  SectionStyle2: {
    flexDirection: 'row',
    borderWidth: .5,
    borderColor: '#7ea107',
    height: 40,
    borderRadius: 5 ,
    marginTop: 5
},
 
ImageStyle: {
  flex: -1,
    padding: 0,
    marginTop: 5,
    marginLeft:5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},
  avatar: {
    borderRadius: 10,
    width: 100,
    height: 100
  },
  containerPayment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#949396',
    margin: 5,
    borderRadius: 5,
    height: 35
},
  containerPayWith: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#949396',
    margin: 5,
    borderRadius: 5,
    height: 75,
    width:65
},
left: {
    // flex: 1,
    marginRight:10,
    paddingTop: 10,
    width: 20,
    height: 20
},
right: {
  marginRight:10,
    paddingTop: 7,
    // flex: 8
},
leftPay: {
    // flex: 1,
    marginRight:10,
    paddingTop: 10,
    width: 100,
    height: 100
},
rightPay: {
  marginRight:10,
    paddingTop: 7,
    // flex: 8
},
selectedDot: {
    width: 15,
    height: 15,
    backgroundColor: '#5E50A1',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5E50A1'
},
unSelectedDot:{
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5E50A1'
},
text:{
    fontSize: 14,
    color: '#5E50A1'
},
textBold:{
    fontSize: 14,
    color: '#5E50A1',
    fontWeight: 'bold'
}
});

AppRegistry.registerComponent('youexpress', () => youexpress);
