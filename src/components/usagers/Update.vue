<template>
  <section class="section">
    <h1 class="title">Modifier l'usager {{fullname}}</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <div class="control">
          <label class="label">Nom</label>
          <input class="input" v-model="usager.nom" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Prénom</label>
          <input class="input" v-model="usager.prenom" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Adresse</label>
          <input class="input" v-model="usager.adresse" required/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Téléphone</label>
          <input class="input" v-model="usager.telephone" required/>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" type="submit">Envoyer</button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <router-link class="button is-outlined" :to="{name : 'usagers.index'}">Annuler</router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['id'],
    created () {
      axios.get(`http://localhost:8083/usagers/${this.id}`)
        .then(resp => {
          this.usager = resp.data
        })
    },
    data () {
      return {
        usager: {}
      }
    },
    computed: {
      fullname () {
        return `${this.usager.nom} ${this.usager.prenom}`
      }
    },
    methods: {
      submit () {
        axios.put(`http://localhost:8083/usagers/${this.id}`, this.usager)
          .then(resp => {
            this.$router.push({name: 'usagers.index'}, () => {
              this.$toast.open({
                message: 'Modification effectué',
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
