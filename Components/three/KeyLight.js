function KeyLight({ position }) {
  return (
    <rectAreaLight
      width={31}
      height={31}
      color='#ffc9f9'
      intensity={8}
      position={position}
      lookAt={[0, 0, 0]}
      penumbra={1}
    />
  );
}

export default KeyLight;
