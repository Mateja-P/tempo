import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDecal, setActiveDecalR } from '../../../Context/editorRedux';
import axios from 'axios';

const ImagesPanel = React.forwardRef(function ImagesPanel({
  setActiveImage,
  setActiveDecal,
  prevValues,
}) {
  const { allDecals, activeDecalR, face } = useSelector(
    (state) => state.editor
  );
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [activeImage, setImage] = useState([]);
  let [imageIndex, setIndex] = useState(0);
  let [sendFiles, setSending] = useState([]);

  useEffect(() => {
    window.localStorage.removeItem('recent-image');
  }, []);

  useEffect(() => {
    setIndex((imageIndex = imageIndex + 1));

    setImage(files.length > 0 ? [files[files.length - 1]] : []);

    window.localStorage.setItem('allImages', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    if (activeImage.length > 0) {
      setActiveImage(activeImage);
      // console.log(activeImage);
      // setMImage(activeImage);
    }
  }, [activeImage]);

  // useEffect(() => {
  //   if (sendFiles.length > 0) {
  //     const reader = new FileReader();
  //     sendFiles.forEach((e) => {
  //       reader.readAsDataURL(e);
  //     });

  //     reader.addEventListener('load', () => {
  //       window.localStorage.setItem('recent-image', reader.result);
  //     });
  //   }
  // }, [sendFiles]);

  // useEffect(() => {
  //   const images = window.localStorage.getItem('recent-image');
  //   setFiles([
  //     ...files,
  //     {
  //       url: images,
  //       id: imageIndex,
  //     },
  //   ]);

  //   setActiveImage();
  // }, [sendFiles]);

  const res = allDecals.filter((e) => {
    return e.decalFace === face;
  });

  const addImage = () => {
    const d = new Date();
    const ms = d.getTime();
    const images = window.localStorage.getItem('recent-image');
    if (images) {
      setFiles([
        ...files,
        {
          url: images,
          id: imageIndex,
        },
      ]);
      // setActiveImage();
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
          // const { name } = e.target.files[0];
          // setFiles([...files, { id: imageIndex, name }]);
          // setFiles({ id: imageIndex, name });
          // setTestImage(name);
          console.log(e.target.files);

          if (
            e.target.files[0].type === 'image/png' ||
            e.target.files[0].type === 'image/jpeg'
          ) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.addEventListener('load', () => {
              window.localStorage.setItem('recent-image', reader.result);
            });
          }

          // setSending([...sendFiles, e.target.files[0]]);
        }}
      >
        <input type='file' />
      </form>
      <div className='cursor-pointer' onClick={() => addImage()}>
        Add image
      </div>
      <div className='mb-2'>
        {files.length > 0 &&
          files.map((e, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setImage(
                    files.filter((el) => {
                      return el.id == e.id;
                    })
                  );
                }}
                style={
                  activeImage.length > 0 && activeImage[0].id === e.id
                    ? {
                        display: 'inline-flex',
                        border: '1px solid white',
                      }
                    : { border: 'none' }
                }
              >
                <div
                  onClick={() => {
                    setFiles(
                      files.filter((el) => {
                        return el.id !== e.id;
                      })
                    );
                  }}
                >
                  X
                </div>

                {/* <img className='w-[100px]' src={'/scene/' + e.name} /> */}
                <img className='w-[100px]' src={e.url} />
              </div>
            );
          })}
      </div>
      <div>
        {allDecals.length > 0 &&
          res.map((e) => {
            return (
              <div
                className='my-2 p-2'
                onClick={() => {
                  dispatch(setActiveDecalR(e.id));
                  setActiveDecal(e.id);
                }}
                style={
                  activeDecalR === e.id
                    ? { border: '1px solid white' }
                    : { border: '' }
                }
              >
                {/* <div className='mb-2'>{e.decalImg}</div> */}
                <div className='mb-2'>{e.id}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default ImagesPanel;
