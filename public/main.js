const handleReady = () => {

  if (document.location.pathname === '/posts/new' || document.location.pathname.indexOf('edit') > 0) {
    const simplemde = new SimpleMDE()
  }
}

document.addEventListener('DOMContentLoaded', handleReady)