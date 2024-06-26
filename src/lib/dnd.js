export function draggable(node, data) {
    let state = data;

    node.draggable = true;
    node.style.cursor = 'grab'

    function handle_dragstart(e) {
        e.dataTransfer.setData('text/plain', state);
    }

    node.addEventListener('dragstart', handle_dragstart)

    return {
        // update function gets called everytime the props from the outside change
        update(data) {
            state = data;
        },

        destroy() {
            node.removeEventListener('dragstart', handle_dragstart)
        }
    }
}

export function dropzone(node, options) {
    let state = {
        dropEffect: 'move',
        dragover_class: 'droppable',
        ...options
    }

    function handle_dragenter(e) {
        e.target.classList.add(state.dragover_class);
    }

    function handle_dragleave(e) {
        e.target.classList.remove(state.dragover_class)
    }

    function handle_dragover(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = state.dropEffect;
    }

    function handle_drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain')
        e.target.classList.remove(state.dragover_class)
        state.on_dropzone(data, e)
    }

    node.addEventListener('dragenter', handle_dragenter)
    node.addEventListener('dragleave', handle_dragleave)
    node.addEventListener('dragover', handle_dragover)
    node.addEventListener('drop', handle_drop)


    return {
        destroy() {
            node.removeEventListener('dragenter', handle_dragenter)
            node.removeEventListener('dragleave', handle_dragleave)
            node.removeEventListener('dragover', handle_dragover)
            node.removeEventListener('drop', handle_drop)
        }
    }
}

export function add(data) {
    let state = data;
    function handle_formsubmit(e) {
        
    }
}