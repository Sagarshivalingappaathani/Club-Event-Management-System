"use client";
import React, { useEffect, useState } from 'react'

const Smp = () => {

  const [message, setMessage] = useState("Loading")
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        setMessage(data.message)
        setPeople(data.people)
        console.log(data);
      }
    )
  }, [])

  return (
    <div>
      <div>{message}</div>
      {
        people.map((person, index) => (
          <div key={index}>
            {person}
          </div>
        ))
      }
    </div>
  )
}

export default Smp;