import React from "react";

const FormContainer = ({
  changeHandler,
  userImage,
  value,
  placeholder,
  replyBox,
  handlePostSubmit,
  postBox,
}) => {
  return (
    <>
      <div className="postFormContainer">
        <div className="userImageContainer">
          <img src={userImage} alt="User Profile " />
        </div>
        <div className="textareaContainer">
          <form>
            <textarea
              name="text"
              value={value}
              onChange={changeHandler}
              placeholder={placeholder}
            />
            {postBox ? (
              <button
                onClick={handlePostSubmit}
                className="submitButton"
                type="Submit"
                disabled={value.trim() === "" ? true : false}
              >
                Post
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default FormContainer;
