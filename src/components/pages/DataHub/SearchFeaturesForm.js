import React from 'react';
import './DataHub.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
const SearchFeaturesForm = () => {

    return (
        <div className="searchWrapper">
            <div className="searchFeaturesContainer">
                <div classname="h1Holder">
                    <h2 className="h1Styles">Search Features</h2>
                    <p className="divider">
                        <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
                    </p>
                </div>
                <div className="featureForm">
                    <form>
                        <div className="valueSep">
                            <div>
                                <label for='x value'>Choose an X value</label>
                                <select id='xvalue' name='xvalue'>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                </select>
                            </div>
                            <div>
                                <label for='y value'>Choose an Y value</label>
                                <select id='yvalue' name='yvalue'>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                </select>
                            </div>
                        </div>
                        <div className="valueSep">
                            <div>
                                <label for='x value'>different value</label>
                                <select id='xvalue' name='xvalue'>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                </select>
                            </div>
                            <div>
                                <label for='y value'>different value</label>
                                <select id='yvalue' name='yvalue'>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                    <option>test</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
};

export default SearchFeaturesForm;
