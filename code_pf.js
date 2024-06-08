window.onload=function(){
    //Функция подсчета ребер при вершине
    function createAdjacencyArray(matrix) {
      let n = matrix.length;
      // Проверяем, что осталось 2 вершины
      let prov=0;
      let adjacencyArray = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (matrix[i][j] === 1) {
            prov += 1;
            adjacencyArray[i]++;
          }
        }
      }
      console.log("i am adjacencyArray - array versh " + adjacencyArray)
      if(prov <= 2){
        return null;
      }else{
        return adjacencyArray;
      }
    }
    //функция нахождения кода Прюфера
    function getCodePF( matrix,cod_pf) {
      // номер минимальной вершины с 1 ребром
      let min_index = null;
      // массив вершин кол-во ребер
      let adjacencyArray = createAdjacencyArray(matrix);

      if(adjacencyArray === null){
        return 0;
      }
      // Находим минимальную по величине вершину, у которогй 1 ребро
           for (let i = 0; i < adjacencyArray.length; i++) {
             if (adjacencyArray[i] === 1) {
               min_index = i;
               break;
             }
           }
           let min_adjacency_index = null;
           // Находим смежную с ней вершину, пробегаясь по матрице смежности
           for (let i = 0; i < matrix[min_index].length; i++) {
               if (matrix[min_index][i] === 1) {
                 min_adjacency_index = i;
                 break;
               }
             }
           //Записываем смежную вершину в код Прюфера
           cod_pf.push(min_adjacency_index + 1);
           console.log("i am the part code pf " + cod_pf);
           //
           let code = [];
           // Убираем соединение между вершинами в матрице смежности и у смежной вершины из кол-ва ее вершин вычитаем 1
           matrix[min_index][min_adjacency_index] = 0;
           matrix[min_adjacency_index][min_index] = 0;
           code.push(min_adjacency_index);
           adjacencyArray[min_index]= 0;
           adjacencyArray[min_adjacency_index] -= 1;
           for (let i = 0; i < matrix.length; i++) {
               console.log("i am "+ i + " colum " +matrix[i]);
           }
           getCodePF(matrix,cod_pf);


    }
    document.getElementById('processString').onclick = startFunction;
    function startFunction() {
          let userInput = document.getElementById("inputString").value;
          console.log(userInput);
          //создаем массив пар с номерами смежных вершин
          let pairs = userInput.match(/\((.*?)\)/g).map(pair => pair.slice(1, -1).split(','));
          // получаем матрицу смежности
          let matrix=generateAdjacencyMatrix(pairs);
          for (let i = 0; i < matrix.length; i++) {
            console.log("i am "+ i + " matrix Смежности " + matrix[i]);
          }
          console.log(pairs);
          let cod_pf=[];
          getCodePF(matrix,cod_pf);
          console.log("i am code pf " + cod_pf);
          //let answerBlock = document.getElementById('unswer');
          //answerBlock.innerHTML = generateBooleanVector(parseInt(userInput));
    }
    function  generateAdjacencyMatrix(pairs){
          // Создаем пустую матрицу смежности
          let matrix = [];
          // Определяем максимальное значение вершины
          let maxVertex = 0;
          for (let i = 0; i < pairs.length; i++) {
            let vertex1 = parseInt(pairs[i][0]);
            let vertex2 = parseInt(pairs[i][1]);
            maxVertex = Math.max(maxVertex, vertex1, vertex2);
          }

          // Инициализируем матрицу смежности
          for (let i = 0; i < maxVertex; i++) {
           matrix[i] = new Array(maxVertex).fill(0);
          }

      // Заполняем матрицу смежности
      for (var i = 0; i < pairs.length; i++) {
        let vertex1 = parseInt(pairs[i][0]);
        let vertex2 = parseInt(pairs[i][1]);
        matrix[vertex1-1][vertex2-1] = 1;
        matrix[vertex2-1][vertex1-1] = 1;
      }

      // Возвращаем матрицу смежности
      return matrix;
    }
};