window.onload=function(){
function getOst(){
    //Получение матрицы смежности из html
    let inputText = document.getElementById('matrix').value;
    let lines = inputText.split('\n');
    let G = [];
    for (let i = 0; i < lines.length; i++) {
        G[i] = [];
    }
    for (let i = 0; i < lines.length; i++) {
        let lineValues = lines[i].split(' ');
        for (let j = 0; j < lineValues.length; j++) {
            G[i][j] = parseInt(lineValues[j]);
        }
    }

    const INF = 9999999;

    // number of vertices in graph
    const V = G.length;

    // create a 2d array of size 5x5
    // for adjacency matrix to represent graph
    /*let G = [
      [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 2, 7, 5, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 0, 0, 3, 3, 11, 7, 8],
      [0, 0, 0, 0, 3, 0, 0, 0, 4, 0],
      [0, 0, 1, 0, 3, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 11, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 7, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 3, 2, 0, 0]
      0, 5, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 2, 7, 5, 0, 0, 0, 0, 0,
      0, 2, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 7, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 5, 0, 0, 0, 3, 3, 11, 7, 8,
      0, 0, 0, 0, 3, 0, 0, 0, 4, 0,
      0, 0, 1, 0, 3, 0, 0, 0, 0, 3,
      0, 0, 0, 0, 11, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 7, 4, 0, 0, 0, 0,
      0, 0, 0, 0, 8, 0, 3, 2, 0, 0
    ];*/

    let no_edge; // number of edges

    // create an array to track selected vertex
    // selected will become true otherwise false
    // список вершин true - пройденные, false-нет
    let selected = new Array(V).fill(false);

    // грани
    no_edge = 0;

    // the number of edges in the minimum spanning tree will always be
    // less than (V - 1), where V is the number of vertices in the graph

    // choose 0th vertex and make it true
    selected[0] = true;

    let x; // row number
    let y; // col number

    // print for edge and weight
    console.log("Edge : Weight");
    // заводим матрицу смежности для остогого дерева, пока пустую
    let min_Osttree = new Array(10).fill(0).map(() => new Array(10).fill(0));
    for (let i = 0; i < min_Osttree.length; i++) {
       console.log("i am empty min Ost tree " + min_Osttree[i]);
    }
    // проходимся по всем граням и вершинам
    while (no_edge < V - 1) {
      // For every vertex in the set S, find all adjacent vertices
      // calculate the distance from the vertex selected at step 1.
      // if the vertex is already in the set S, discard it;
      // otherwise, choose another vertex nearest to the selected vertex at step 1.
      // заводим переменную, которую будем сравнивать с минимальным путем
      let min = INF;
      x = 0;
      y = 0;
      //проходимся по вершинам и сравниваем пути из них до других вершин, находим самый короткий
      for (let i = 0; i < V; i++) {
        if (selected[i]) {
          for (let j = 0; j < V; j++) {
            if (!selected[j] && G[i][j]) {
              // not in selected and there is an edge
              if (min > G[i][j]) {
                min = G[i][j];
                x = i;
                y = j;
              }
            }
          }
        }
      }

      console.log(x + " - " + y + " : " + G[x][y]);
      // заносим в матрицу смежности остового графа путь и вес
      min_Osttree[x][y]=G[x][y];
      selected[y] = true;
      no_edge++;
    }
    for (let i = 0; i < min_Osttree.length; i++) {
        console.log("i am min Ost tree " +min_Osttree[i]);
    }
        return min_Osttree;
    }
    document.getElementById('solve').onclick = getOst;


};
