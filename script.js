class RubiksCube {
    constructor() {
        this.resetFaces();
        this.history = []; // Track moves
        this.steps = [];   // Display steps
    }

    resetFaces() {
        this.faces = {
            U: Array(9).fill('w'), // Up -> White
            D: Array(9).fill('y'), // Down -> Yellow
            F: Array(9).fill('g'), // Front -> Green
            B: Array(9).fill('b'), // Back -> Blue
            L: Array(9).fill('o'), // Left -> Orange
            R: Array(9).fill('r')  // Right -> Red
        };
    }

    // Rotate face Clockwise
    rotateFace(face) {
        const f = this.faces[face];
        this.faces[face] = [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]];
    }


    rotate(face, track = true) {
        this.rotateFace(face);
        let t;
        switch (face) {
            // Rotate Front face
            case 'F':
                t = this.faces.U.slice(6, 9);
                [this.faces.U[6], this.faces.U[7], this.faces.U[8]] = [this.faces.L[8], this.faces.L[5], this.faces.L[2]];
                [this.faces.L[2], this.faces.L[5], this.faces.L[8]] = [this.faces.D[2], this.faces.D[1], this.faces.D[0]];
                [this.faces.D[0], this.faces.D[1], this.faces.D[2]] = [this.faces.R[0], this.faces.R[3], this.faces.R[6]];
                [this.faces.R[0], this.faces.R[3], this.faces.R[6]] = t;
                break;

            // Rotate Back face
            case 'B':
                t = this.faces.U.slice(0, 3);
                [this.faces.U[0], this.faces.U[1], this.faces.U[2]] = [this.faces.R[2], this.faces.R[5], this.faces.R[8]];
                [this.faces.R[2], this.faces.R[5], this.faces.R[8]] = [this.faces.D[8], this.faces.D[7], this.faces.D[6]];
                [this.faces.D[6], this.faces.D[7], this.faces.D[8]] = [this.faces.L[6], this.faces.L[3], this.faces.L[0]];
                [this.faces.L[0], this.faces.L[3], this.faces.L[6]] = t;
                break;

            // Rotate Up face
            case 'U':
                t = this.faces.B.slice(0, 3);
                [this.faces.B[0], this.faces.B[1], this.faces.B[2]] = [this.faces.R[0], this.faces.R[1], this.faces.R[2]];
                [this.faces.R[0], this.faces.R[1], this.faces.R[2]] = [this.faces.F[0], this.faces.F[1], this.faces.F[2]];
                [this.faces.F[0], this.faces.F[1], this.faces.F[2]] = [this.faces.L[0], this.faces.L[1], this.faces.L[2]];
                [this.faces.L[0], this.faces.L[1], this.faces.L[2]] = t;
                break;

            // Rotate Down face
            case 'D':
                t = this.faces.B.slice(6, 9);
                [this.faces.B[6], this.faces.B[7], this.faces.B[8]] = [this.faces.L[6], this.faces.L[7], this.faces.L[8]];
                [this.faces.L[6], this.faces.L[7], this.faces.L[8]] = [this.faces.F[6], this.faces.F[7], this.faces.F[8]];
                [this.faces.F[6], this.faces.F[7], this.faces.F[8]] = [this.faces.R[6], this.faces.R[7], this.faces.R[8]];
                [this.faces.R[6], this.faces.R[7], this.faces.R[8]] = t;
                break;

            // Rotate Left face
            case 'L':
                t = [this.faces.U[0], this.faces.U[3], this.faces.U[6]];
                [this.faces.U[0], this.faces.U[3], this.faces.U[6]] = [this.faces.B[8], this.faces.B[5], this.faces.B[2]];
                [this.faces.B[2], this.faces.B[5], this.faces.B[8]] = [this.faces.D[0], this.faces.D[3], this.faces.D[6]];
                [this.faces.D[0], this.faces.D[3], this.faces.D[6]] = [this.faces.F[0], this.faces.F[3], this.faces.F[6]];
                [this.faces.F[0], this.faces.F[3], this.faces.F[6]] = t;
                break;

            // Rotate Right face
            case 'R':
                t = [this.faces.U[2], this.faces.U[5], this.faces.U[8]];
                [this.faces.U[2], this.faces.U[5], this.faces.U[8]] = [this.faces.F[2], this.faces.F[5], this.faces.F[8]];
                [this.faces.F[2], this.faces.F[5], this.faces.F[8]] = [this.faces.D[2], this.faces.D[5], this.faces.D[8]];
                [this.faces.D[2], this.faces.D[5], this.faces.D[8]] = [this.faces.B[6], this.faces.B[3], this.faces.B[0]];
                [this.faces.B[0], this.faces.B[3], this.faces.B[6]] = t;
                break;
        }

        if (track) {
            this.history.push(face); // Tracking moves
            this.steps.push(`Rotate ${face}`); // Display steps
        }

        this.render();
    }


    // Perform inverse rotation by rotating 3 times
    rotateInverse(face) {
        this.rotate(face, false);
        this.rotate(face, false);
        this.rotate(face, false);
        this.steps.push(`Undo ${face}`); // Display Undo Steps
    }


    // Solving the Cube
    solve() {
        if (this.history.length === 0) {
            this.steps.push('Nothing to solve.');
            this.render();
            return;
        }

        this.steps.push('Solving Cube...'); // Start Message

        // Apply inverse of each move in reverse order
        const reverseMoves = [...this.history].reverse();
        for (let move of reverseMoves) {
            this.rotateInverse(move);
        }

        this.history = []; // Clear history after solving
        this.steps.push('Cube Solved!'); // End Message
        this.render();
    }

    
    // Final Result
    getCubeString() {
        return (
            this.faces.U.join('') +
            this.faces.R.join('') +
            this.faces.F.join('') +
            this.faces.D.join('') +
            this.faces.L.join('') +
            this.faces.B.join('')
        );
    }

    // Update steps & show result
    render() {
        document.getElementById('cubeDisplay').innerHTML =
            `<pre style="font-size:14px; background:#eee; padding:10px;">${this.getCubeString()}</pre>`;
        document.getElementById('steps').innerHTML =
            this.steps.map(step => `<div>${step}</div>`).join('');
    }
}


const cube = new RubiksCube();

function rotateCube(face) {
    cube.rotate(face);
}

function solveCube() {
    cube.solve();
}

cube.render();