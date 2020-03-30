import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends React.Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }

    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
    let {displaySocialInputs, errors, ...newProfile} = this.state;
    this.props.createProfile(newProfile, this.props.history)
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { value: "0", label: "* Select Professional Status" },
      { value: "Developer", label: "Developer" },
      { value: "Junior Developer", label: "Junior Developer" },
      { value: "Senior Developer", label: "Senior Developer" },
      { value: "Manager", label: "Manager" },
      { value: "Student or Learning", label: "Student or Learning" },
      { value: "Instructor", label: "Instructor or Teacher" },
      { value: "Intern", label: "Intern" },
      { value: "Other", label: "Other" }
    ];
    let socialInput;
    if (displaySocialInputs) {
      socialInput = (
        <>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa fa-twitter"
            value={this.state.twitter}
            error={errors.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fa fa-facebook"
            value={this.state.facebook}
            error={errors.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fa fa-linkedin"
            value={this.state.linkedin}
            error={errors.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fa fa-youtube"
            value={this.state.youtube}
            error={errors.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fa fa-instagram"
            value={this.state.instagram}
            error={errors.instagram}
            onChange={this.onChange}
          />
        </>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile handle"
                  type="text"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A uique handle for your profile URL. Your full name, company name, nickname, ect (This CAN'T be changed later)"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  type="text"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  type="text"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  type="text"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  type="text"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="Github Username"
                  type="text"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInput}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProp, { createProfile, getCurrentProfile })(EditProfile);
