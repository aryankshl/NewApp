import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date,source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://images.news9live.com/wp-content/uploads/2024/03/Asteroid-Close-Approach-Alert-4.jpg?w=802&enlarge=true"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex : '1'}}>
                {source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknow" : author} last update{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="__blank"
              className="btn btn-sm btn-primary bg-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
