body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  color: #333;
}

#container {
  display: flex;
  width: 80%;
  max-width: 1000px;
}

#calculator {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#screen {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: right;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #e9e9e9;
  overflow: hidden;
}

#buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}

button {
  height: 50px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background: #dcdcdc;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

button:hover {
  background: #c0c0c0;
}

button:active {
  background: #a9a9a9;
  transform: scale(0.95);
}

#history {
  flex: 1;
  margin-left: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 400px;
}

h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  font-size: 1rem;
}
