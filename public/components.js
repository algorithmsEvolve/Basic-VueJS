
// local registration
const Home = {
    template: `<div>Home</div>`
}

const About = {
    template: `<div>About</div>`
}

const NotFound = {
    template: `<div>Halaman Tidak Ditemukan..</div>`
}

const DetailKelas = {
    template: `
            <div>
                <template v-if="detailKelas">
                <div>
                    <img :src="'../image/'+detailKelas.gambar" width="200" />
                    <h3>{{ detailKelas.judul }}</h3>
                    <p>{{ detailKelas.deskripsi }}</p>
                    <router-link to="/kelas">kembali</router-link>
                </div>
                </template>
                <p v-else>kelas tidak ada</p>
            </div>`,
    data() {
        return {
            detailKelas: {}
        }
    },
    created() {
        this.filterkelas()
    },
    methods: {
        filterkelas() {
            let id = this.$route.params.idkelas
            let kelasDetailRef = database.ref('/kelas/' + id)
            kelasDetailRef.on('value', (item) => {
                this.detailKelas = item.val()
            })
        }
    }
}

const Kelas = {
    props: ['items', 'input'],
    template: `<div>
            <h3>Tambah Kelas</h3>
            
            <form @submit.prevent="submitkelas">
            <div class="input-group">
                <input type="text" placeholder="Nama Kelas" v-model="kelas.judul">
                <div class="error" v-if="error.judul"><small>{{ error.judul }}</small></div>
            </div>

            <div class='input-group'>
                <label>Deskripsi: </label> <br>
                <textarea v-model="kelas.deskripsi"></textarea>
                <div class="error" v-if="error.deskripsi"><small>{{ error.deskripsi }}</small></div>
            </div>

            <div class="input-group">
                <p v-if="previewimg">
                    <img :src="previewimg" width="200">
                </p>
                <label>Masukkan Gambar</label> <br>
                <input type="file" @change="upload" ref="gambar" />
            </div>
            <button type="submit">Submit</button>
            </form>

            <hr>

            <h3>Daftar kelas {{ items.length }}</h3>
            <template v-if="items.length">
                <ul>
                    <li v-for="(item, index) of items">
                        <img :src="'image/'+item.gambar" width="200" />
                        <p>
                            {{ index+1 }} - {{ item.judul }}
                            <a href="" @click.prevent="$emit('hapuskelas', item.id)">hapus</a>
                            <router-link :to="'/kelas/' + item.id">lihat kelas</router-link>
                        </p>
                    </li>
                </ul>
            </template>
            <li v-else>Kelas belum tersedia.</li> </div>`,
    data: function () {
        return {
            kelas: {
                judul: '',
                deskripsi: '',
                gambar: ''
            },
            previewimg: '',
            error: {
                judul: '',
                deskripsi: '',
            }
        }
    },
    methods: {
        submitkelas: function () {
            this.error.judul = '',
                this.error.deskripsi = ''

            if (this.kelas.judul === '') {
                this.error.judul = 'Judul is required'
            }

            if (this.kelas.deskripsi === '') {
                this.error.deskripsi = 'Deskripsi is required'
            }

            if (this.kelas.judul && this.kelas.deskripsi) {
                const data = {
                    id: uuidv4(),
                    judul: this.kelas.judul,
                    deskripsi: this.kelas.deskripsi,
                    gambar: this.kelas.gambar
                }
                this.$emit('submitkelas', data)

                this.kelas.judul = ''
                this.kelas.deskripsi = ''
                this.kelas.gambar = ''
                this.previewimg = ''
                this.$refs.gambar.value = ''
            }
        },
        upload: function (event) {
            const namagambar = event.target.files[0].name
            this.kelas.gambar = namagambar
            this.previewimg = URL.createObjectURL(event.target.files[0])
        }
    }
}

// components
Vue.component('header-component', {
    props: ['nama'],
    template: `<header>
            <img src="../image/logo.png" width="100">
            <p>{{ 'Hello, ' + nama }}</p>
        </header>`,
    data: function () {
        return {
            pesan: 'Hello, Component!'
        }
    }
})

Vue.component('footer-component', {
    template: `
            <footer id="footer">
                <slot></slot>
            </footer>`
})