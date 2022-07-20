<template>
  <div class="container w-25 mt-5 p-5" style="border-style: double; border-radius:5px;">
    <div class="mt-3">
      <h2><i>Dejanos tu consulta!</i></h2>
    </div>
    <form class="mt-4">
      <div class="form-group">
        <label class="form-label fs" for="name"><i><b>Nombre</b></i></label>
        <input
          class="form-control input-sm"
          type="text"
          placeholder="Escriba aqui su nombre.."
        />
      </div>

      <div class="form-group mt-3">
        <label class="form-label fs" for="emailAddress"><i><b>Email</b></i></label>
        <input
          class="form-control input-sm"
          type="email"
          placeholder="Escriba aqui su email.."
        />
      </div>

      <div class="form-group mt-3">
        <label class="form-label fs" for="message"><i><b>Consulta</b></i></label>
        <textarea
          class="form-control input-sm"
          type="text"
          placeholder="Escriba aqui su mensaje.. (1000 caracteres max)"
          rows="10"
          maxlength="1000"
        ></textarea>
      </div>

      <div class="form-group mt-3 text-center">
        <button class="btn btn-warning btn-md" type="submit">Enviar</button>
      </div>
    </form>
  </div>
</template>

<style>
.fs {
  font-size: 16pt;
}
</style>
