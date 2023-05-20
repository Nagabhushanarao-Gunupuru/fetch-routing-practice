// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import UserInfo from '../UserInfo'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {blogList: [], isLoading: true}

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updateData = data.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      topic: each.topic,
      title: each.title,
      avatarUrl: each.avatar_url,
      author: each.author,
    }))
    this.setState({blogList: updateData, isLoading: false})
  }

  render() {
    const {blogList, isLoading} = this.state
    return (
      <div className="blogList-container">
        <UserInfo />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <div>
            {blogList.map(eachItem => (
              <BlogItem blogData={eachItem} key={eachItem.id} />
            ))}
          </div>
        )}
        )
      </div>
    )
  }
}
export default BlogList
