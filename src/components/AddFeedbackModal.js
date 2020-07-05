import React, { useState, useEffect, } from 'react'
import { connect } from 'react-redux'

import LabeledInput from './LabeledInput';
import { createFeedback } from '../store/feedbacks';
import { usePrevious } from '../util/customHooks';
import Loader from './Loader';
import { startCase, } from 'lodash';

function isEmailValid(val) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(val);
}

const validate = (inputName, value, validationsObj = {}) => {
    const { required, minlength, maxlength, type } = validationsObj || {};
    const len = value.toString().length
    const name = startCase(inputName);
    if(required && !value) {
        return `${name} is Required.`;
    } 
    if(minlength && len > 0 && len < minlength) {
        return `Should be min ${minlength} characters long.`
    }
    if(maxlength && len > maxlength) {
        return `Should be max ${maxlength} characters long.`
    }
    if((!required && len > 0) && type === 'email' && !isEmailValid(value)) {
        return 'Invalid Email';
    }
    return false;
}

export const AddFeedbackModal = ({open, setOpen, createFeedbackLoading, ...props}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const prevLoadingState = usePrevious(createFeedbackLoading)

    const initErrorsState = {
        name: '',
        email: '',
        title: '',
        content: '',
    }

    const [errors, setErrors] = useState(initErrorsState)

    const validations = {
        name: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: 'email',
            required: false,
            minlength: 10,
            maxlength: 100,
        },
        title: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        content: {
            required: true,
            minlength: 8,
            maxlength: 2048,
        },
    }

    const handleChange = (inputName, val) => {
        switch(inputName) {
            case 'name':
                setName(val);
                break;
            case 'email':
                setEmail(val);
                break;
            case 'title':
                setTitle(val);
                break;
            case 'content':
                setContent(val);
                break;
        }
        const err = validate(inputName, val, validations[inputName]);
        // errors[inputName] = err;
        setErrors((errors) => ({...errors, [inputName]: err})) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const values = { name, email, title, content };
        const errs = {}
        for(let prop in validations) {
            console.log("Validating", prop, values[prop], validations[prop])
            errs[prop] = validate(prop, values[prop], validations[prop]);
        }

        setErrors(errs);

        let isFormValid = true;
        for(let prop in errs) {
            console.log(prop, errors[prop])
            isFormValid = isFormValid && !errs[prop]; 
        }
        console.log('Is Form Valid', isFormValid, errs)
        if(isFormValid) props.createFeedback({ name, email, title, content });
    }

    const closeModal = () => {
        setName('');
        setEmail('');
        setTitle('');
        setContent('');
        setOpen(false);
        setErrors(initErrorsState)
    }

    useEffect(() => {
        if(prevLoadingState && !createFeedbackLoading) {
            console.log("Request Should be completed!");
            if(!props.createFeedbackError) closeModal();
        }
    }, [createFeedbackLoading])

    return (
        <div className={`modal add-feedback-modal ${open && 'open'}`}>
            <div className="modal-content-wrapper">
                <div className="row justify-content-space-between align-items-center modal-header">
                    <div className="modal-title">Add Comment</div>
                    <div className="close-wrapper">
                        <div className="close" onClick={() => closeModal()}>
                            Close
                        </div>
                    </div>
                </div>
                <div className="modal-content">
                    {createFeedbackLoading ? (
                        <Loader />
                    ): (
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <LabeledInput
                                    name="name"
                                    id="name"
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={handleChange}
                                    validations={validations.name}
                                    error={errors.name}
                                />
                                <LabeledInput
                                    name="email"
                                    id="email"
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={handleChange}
                                    validations={validations.email}
                                    error={errors.email}
                                />
                                <LabeledInput
                                    name="title"
                                    id="title"
                                    type="text"
                                    label="Title"
                                    value={title}
                                    onChange={handleChange}
                                    validations={validations.title}
                                    error={errors.title}
                                />
                                <LabeledInput
                                    name="content"
                                    id="content"
                                    type="textarea"
                                    label="Content"
                                    value={content}
                                    onChange={handleChange}
                                    validations={validations.content}
                                    error={errors.content}
                                />
                                <input type="submit" />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.feedbacks,
})

const mapDispatchToProps = dispatch => ({
    createFeedback: (data) => dispatch(createFeedback(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedbackModal)
