import React from 'react';


const NavigationBox = (props) => {

  //const base_url = "http://localhost:3000";


  return (
    <div className="search-options-box ">
    <div className="action-items">
        <div>
            <span className="shadow-effect">
               <a href="#">
                   <img src="http://localhost:3002/img/features/story-bug-logo.png" alt="" />
                   <span>
                       StoryBuds&trade;
                   </span>
               </a>
            </span>
            <span className="shadow-effect">
                <a href="#">
                    <img src="http://localhost:3002/img/features/story-tag-logo.png" alt="" />
                    <span>
                       StoryTags&trade;
                   </span>
                </a>
            </span>
        </div>
        <div>
            <span className="shadow-effect">
               <a href="#">
                   <img src="http://localhost:3002/img/features/messages.png" alt="" />
                   <span>
                       Messages
                   </span>
               </a>
            </span>
            <span className="shadow-effect">
                <a href="#">
                    <img src="http://localhost:3002/img/features/saved-stories.png" alt="" />
                    <span>
                       Saved Stories
                   </span>
                </a>
            </span>
        </div>
    </div>
</div>
  );
}


export default NavigationBox;
