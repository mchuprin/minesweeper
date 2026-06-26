export function getNeighbors(index: number, cols: number, rows: number): number[] {
	const row = Math.floor(index / cols);
	const col = index % cols;
	const neighbors: number[] = [];

	for (let dr = -1; dr <= 1; dr++) {
		for (let dc = -1; dc <= 1; dc++) {
			if (dr === 0 && dc === 0) continue;
			const nr = row + dr;
			const nc = col + dc;
			if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
				neighbors.push(nr * cols + nc);
			}
		}
	}

	return neighbors;
}
