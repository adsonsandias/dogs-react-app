import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinete, setInfinete] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infineteScroll() {
      if (infinete) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', infineteScroll);
    window.addEventListener('scroll', infineteScroll);
    return () => {
      window.removeEventListener('wheel', infineteScroll);
      window.removeEventListener('scroll', infineteScroll);
    };
  }, [infinete]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          user={user}
          key={page}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinete={setInfinete}
        />
      ))}
    </div>
  );
};

export default Feed;
