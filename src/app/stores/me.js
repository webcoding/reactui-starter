import _ from 'lodash';
import Reflux from 'reflux';
import meActions from 'actions/me';

export default Reflux.createStore( {

    store: {
        myRecipes: null,          //todo - might want to break this out into its own store
        myFavouriteRecipes: null  //todo - might want to break this out into its own store
    },

    init() {
        this.listenTo( meActions.getMyProfile.completed, gotProfile.bind( this ) );
        this.listenTo( meActions.updateMyProfile.completed, gotProfile.bind( this ) );

        this.listenTo( meActions.getMyRecipes.completed, gotMyRecipes.bind( this ) );
        this.listenTo( meActions.getMyFavouriteRecipes.completed, gotMyFavouriteRecipes.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    setStoreValue( key, value ) {
        _.set( this.store, key, value );
        doTrigger.call( this );
    },

    getStoreValue( key ) {
        return _.get( this.store, key );
    }

} );

///////////////////
////

function gotProfile( profile ) {
    this.store = _.extend( {}, this.store, profile );
    doTrigger.call( this );
}

function gotMyRecipes( recipes ) {
    _.set( this.store, 'myRecipes', recipes );
    doTrigger.call( this );
}

function gotMyFavouriteRecipes( recipes ) {
    _.set( this.store, 'myFavouriteRecipes', recipes );
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}