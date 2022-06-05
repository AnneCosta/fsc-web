import { HeartIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import axios from "axios"

const MAX_TWEET_CHAR = 250

function TweetForm({ loggedInUser, onSuccess }) {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers: {
          authorization: `Bearer ${loggedInUser.accessToken}`
        },
        data: {
          text: values.text
        },
      })

      form.setFieldValue('text', '')
      onSuccess()
    }, 
    initialValues: {
      text: ''
    }
  })

  function changeText(e) {
    setText(e.target.value);
  }

  async function onSubmit(ev){
    ev.preventDefault()
  }

  return (
    <section className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5">
        <img src="/src/img/avatar.png" className="w-7" />
        <h1 className="font-bold text-xl">Página inicial</h1>
      </header>

      <form className="pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none disabled:opacity-50 resize-none"
          placeholder="O que está acontecendo?"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span>
            {""} / {""}
            <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
          >
            Tweet
          </button>
        </div>
      </form>
    </section>
  );
}

function Tweet({ name, username, avatar, children }) {
  return (
    <section className="flex space-x-3 p-4 border-b border-silver">
      <section>
        <img src={avatar} />
      </section>
      <section className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{" "}
        <span className="text-sm text-silver">@{username}</span>
        <p>{children}</p>
        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-5 stroke-1" />
          <span>1.2k</span>
        </div>
      </section>
    </section>
  )
}

export function Home({ loggedInUser }) {
  const [ data, setData ] = useState('')
  
  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
      <div>
        {data.length && data.map(tweetInfo => (
          <Tweet
          key={ tweetInfo.id }
          name={ tweetInfo.user.name }
          username={ tweetInfo.user.username }
          avatar="/src/img/avatar.png"
          >
            { tweetInfo.text }
          </Tweet>
        ))}
      </div>
    </>
  )
}
