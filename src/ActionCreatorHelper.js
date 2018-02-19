import { createAction } from 'redux-actions';
import _                from 'lodash';

// Expect a string in the form of 'ONE_TWO_THREE' and return 'oneTwoThree'
const camelize = str => str.toLowerCase().replace(/_\w/g, cap => cap[1].toUpperCase());

// Expect an array of strings and return { ONE : 'ONE', TWO : 'TWO', THREE : 'THREE' }
export const createTypes = (strings, prefix) => strings.reduce((rc, str) => {
    let actionStr = null;
    prefix = prefix || '';

    if (typeof (str) === 'string') {
        actionStr = str;
    } else {
        actionStr = str.type;
    }

    rc[actionStr] = prefix + actionStr;
    return rc;
}, {'UPDATE_STATE': (prefix || '') + 'UPDATE_STATE'});

// Expect an array of strings and return { oneTwoThree : <action>, fourFiveSix : <action> }
export const createActions = (strings, prefix) => strings.reduce((rc, str) => {
    let actionStr = null;
    let actionPropTypes = null;
    prefix = prefix || '';

    if (typeof (str) === 'string') {
        actionStr = str;
        actionPropTypes = null;
    } else {
        actionStr = str.type;
        actionPropTypes = str.propTypes;
    }

    const action = createAction(prefix + actionStr);

    rc[camelize(actionStr)] = (payload) => {
        if (actionPropTypes) {

            _.each(payload, (value, key) => {
                if (!actionPropTypes[key]) {
                    const result = `Passed parameter ${key} in ${prefix + actionStr} is not defined in PropTypes!`;

                    if ((typeof (window) !== 'undefined') && (window.spiceProduction)) {
                        console.warn(result);
                    } else {
                        throw new Error(result);
                    }
                }
            });
        }
        return action(payload);
    };
    return rc;
}, {'updateState': createAction((prefix || '') + 'UPDATE_STATE')});
