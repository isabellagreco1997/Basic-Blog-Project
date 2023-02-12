// React boilerplate
import React from 'react'
import './styles.css'

// BlogPost component
export default class BlogPost extends React.Component {

  render() {
    const { title, body, image } = this.props
    return (
        <div className="blog-post">
          <img className="blog-post__image" src={image} />
        <h1 className="blog-post__title">{title}</h1>
        <p className="blog-post__body">{body}</p>
      </div>
    )
  }
}
