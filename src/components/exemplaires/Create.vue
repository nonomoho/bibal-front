<template>
  <section class="section">
    <h1 class="title">Ajouter un exemplaire</h1>
    <form @submit.prevent="submit">
      <div class="field is-expanded">
        <div class="select is-fullwidth">
          <label class="label">État</label>
          <select v-model="exemplaire.etat">
            <option v-for="etat in etats" :value="etat.id">{{ etat.name }}</option>
          </select>
        </div>
      </div>
      <div class="field is-expanded">
        <label class="label">Oeuvre</label>
        <div class="select is-fullwidth">
          <select v-model="exemplaire.oeuvre.id">
            <option v-for="oeuvre in oeuvres" :value="oeuvre.id">{{ oeuvre.titre }}</option>
          </select>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" type="submit">Envoyer</button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <router-link class="button is-outlined" :to="{name : 'exemplaires.index'}">Annuler</router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    created () {
      axios.get('http://localhost:8083/oeuvres')
        .then(resp => {
          this.oeuvres = resp.data._embedded.oeuvres
        })
        .catch(e => {
          this.$toast.open({
            message: 'Erreur',
            type: 'is-danger'
          })
        })
    },
    data () {
      return {
        exemplaire: {oeuvre: {}},
        etats: [
          {id: 0, name: 'Bon'},
          {id: 1, name: 'Abimé'},
          {id: 2, name: 'Inutilisable'}
        ],
        oeuvres: []
      }
    },
    methods: {
      submit () {
        axios.post('http://localhost:8083/exemplaires', this.exemplaire)
          .then(resp => {
            this.$router.push({name: 'exemplaires.index'}, () => {
              this.$toast.open({
                message: 'Ajout effectué',
                type: 'is-primary'
              })
            })
          })
          .catch(e => {
            this.$toast.open({
              message: 'Erreur',
              type: 'is-danger'
            })
          })
      }
    }
  }
</script>
