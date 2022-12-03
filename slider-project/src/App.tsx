import { useEffect, useState } from 'react';
import data from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import useThrottle from './useThrottle';

function App() {
  const [people, setPeople] = useState(data);
  const [active, setActive] = useState(0);
  const TIME_TAKEN_TO_SLIDE_ONCE_IN_MS = 500;
  const AUTOSLIDE_AFTER_MILLISECONDS = 3000;

  function checkIndex(index: number): number {
    if (index > people.length - 1) {
      return 0;
    } else if (index < 0) {
      return people.length - 1;
    } else {
      return index;
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      setActive((prev) => checkIndex(prev + 1));
    }, AUTOSLIDE_AFTER_MILLISECONDS);

    return () => {
      clearInterval(intervalID);
    };
  }, [active]);

  function handleBtnClick(direction: string) {
    if (direction === 'next') {
      setActive((curr) => checkIndex(curr + 1));
      return;
    }
    if (direction === 'prev') {
      setActive((curr) => checkIndex(curr - 1));
      return;
    }
  }

  const throttledNext = useThrottle(
    () => handleBtnClick('next'),
    TIME_TAKEN_TO_SLIDE_ONCE_IN_MS,
    {
      leading: true,
      trailing: false,
    }
  );

  const throttledPrev = useThrottle(
    () => handleBtnClick('prev'),
    TIME_TAKEN_TO_SLIDE_ONCE_IN_MS,
    {
      leading: true,
      trailing: false,
    }
  );
  return (
    <section className='slider'>
      <div className='reviews'>
        <h2>
          <span>/</span> reviews
        </h2>
      </div>
      <div className='slide-container'>
        {people.map((singlePerson, i) => {
          const previous = checkIndex(active - 1);
          const next = checkIndex(active + 1);
          let classname = '';
          if (active === i) {
            classname = 'slide active';
          } else if (previous === i) {
            classname = 'slide prev';
          } else if (next === i) {
            classname = 'slide next';
          } else {
            classname = 'slide';
          }
          return (
            <article key={singlePerson.img} className={classname}>
              <img
                src={singlePerson.img}
                alt={singlePerson.name}
                className='img profile-img'
              />
              <h4>{singlePerson.name}</h4>
              <p className='title'>{singlePerson.job}</p>
              <p className='text'>{singlePerson.text}</p>

              <div className='quote-icon'>
                <FaQuoteRight />
              </div>
            </article>
          );
        })}
      </div>

      {/* <!-- buttons --> */}
      <button className='btn next-btn' onClick={throttledNext}>
        <FaChevronRight />
      </button>

      <button className='btn prev-btn' onClick={throttledPrev}>
        <FaChevronLeft />
      </button>
      {/* <!-- end of buttons --> */}
    </section>
  );
}

export default App;
