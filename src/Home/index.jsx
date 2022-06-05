import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";

const MAX_TWEET_CHAR = 250;

function TweetForm() {
  const [text, setText] = useState("");

  function changeText(e) {
    setText(e.target.value);
  }

  return (
    <section className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5">
        <img src="/src/img/avatar.png" className="w-7" />
        <h1 className="font-bold text-xl">Página inicial</h1>
      </header>

      <form className="pl-12 text-lg flex flex-col" action="">
        <textarea
          name="text"
          value={text}
          className="bg-transparent outline-none disabled:opacity-50 resize-none"
          placeholder="O que está acontecendo?"
          rows="4"
          onChange={changeText}
          disabled={false}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span>
            {""} / {""}
            <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
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
  );
}

export function Home() {
  return (
    <>
      <TweetForm />
      <div>
        <Tweet
          name="Fulano de tal"
          username="fulano"
          avatar="/src/img/avatar.png"
        >
          Let's make twitter maximum fun!
        </Tweet>

        <Tweet
          name="Anne Costa"
          username="annemustlive"
          avatar="/src/img/avatar.png"
        >
          Alôooooo
        </Tweet>
      </div>
    </>
  );
}
