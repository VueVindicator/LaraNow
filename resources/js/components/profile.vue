<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">

                <!-- Profile Image -->
                <div class="card card-primary card-outline">
                  <div class="card-body box-profile">
                    <div class="text-center">
                      <img class="profile-user-img img-fluid img-circle" :src="getUserPhoto()" alt="User profile picture">
                    </div>
    
                    <h3 class="profile-username text-center">Nina Mcintire</h3>
    
                    <p class="text-muted text-center">Software Engineer</p>
    
                    <ul class="list-group list-group-unbordered mb-3">
                      <li class="list-group-item">
                        <b>Followers</b> <a class="float-right">1,322</a>
                      </li>
                      <li class="list-group-item">
                        <b>Following</b> <a class="float-right">543</a>
                      </li>
                      <li class="list-group-item">
                        <b>Friends</b> <a class="float-right">13,287</a>
                      </li>
                    </ul>
    
                    <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
    
                <!-- About Me Box -->
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">About Me</h3>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                    <strong><i class="fas fa-book mr-1"></i> Education</strong>
    
                    <p class="text-muted">
                      B.S. in Computer Science from the University of Tennessee at Knoxville
                    </p>
    
                    <hr>
    
                    <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>
    
                    <p class="text-muted">Malibu, California</p>
    
                    <hr>
    
                    <strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>
    
                    <p class="text-muted">
                      <span class="tag tag-danger">UI Design</span>
                      <span class="tag tag-success">Coding</span>
                      <span class="tag tag-info">Javascript</span>
                      <span class="tag tag-warning">PHP</span>
                      <span class="tag tag-primary">Node.js</span>
                    </p>
    
                    <hr>
    
                    <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
    
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
              <div class="col-md-9">
                <div class="card">
                  <div class="card-header p-2">
                    <ul class="nav nav-pills">
                      <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                      <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                    </ul>
                  </div><!-- /.card-header -->
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                        <!-- Post -->
                      </div>
                      <!-- /.tab-pane -->
    
                      <div class="tab-pane" id="settings">
                        <form class="form-horizontal">
                          <div class="form-group row">
                            <label for="inputName" class="col-sm-2 col-form-label" >Name</label>
                            <div class="col-sm-10">
                              <input type="email" class="form-control" id="inputName" placeholder="Name" v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }">
                              <has-error :form="form" field="name"></has-error>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                              <input type="email" class="form-control" id="inputEmail" placeholder="Email" v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }">
                              <has-error :form="form" field="email"></has-error>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="bio" class="col-sm-2 col-form-label">Bio</label>
                            <div class="col-sm-10">
                              <textarea class="form-control" id="bio" placeholder="Bio" v-model="form.bio"></textarea>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="profile" class="col-sm-2 col-form-label">Profile Photo</label>
                            <div class="col-sm-10">
                              <input type="file" id="profile"@change="updateProfile">
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="password" class="col-sm-2 col-form-label">Password (Leave empty if not changing)</label>
                            <div class="col-sm-10">
                              <input type="password" class="form-control" id="password" placeholder="Password" v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }">
                              <has-error :form="form" field="password"></has-error>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="offset-sm-2 col-sm-10">
                              <button type="submit" class="btn btn-danger" @click.prevent="updateInfo">Submit</button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                  </div><!-- /.card-body -->
                </div>
                <!-- /.nav-tabs-custom -->
              </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            form: new Form({
              id: '',
              name: '',
              email: '',
              password: '',
              type: '',
              bio: '',
              photo: ''
            })
          }
        },
        methods: {
          getUserPhoto(){
            let photo = (this.form.photo.length > 200) ? this.form.photo : "img/profile/" + this.form.photo;
            return photo;
          },
          updateInfo(){
            this.$Progress.start();
            this.form.put('api/profile')
            .then(() => {
              Fire.$emit('AfterCreate');
              this.$Progress.finish();
              Toast.fire({
              type: 'success',
              title: 'Profile Updated Successfully'
            })

            })
            .catch(() => {
              this.$Progress.fail();
            });
          },
          updateProfile(e){
            let file = e.target.files[0];
            console.log(file);
            var reader = new FileReader();

            if(file['size'] < 2111775){
              reader.onloadend = (file) => {
                //console.log('Result', reader.result)
                this.form.photo = reader.result;
              }
              reader.readAsDataURL(file);
            }else{
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Image file is too large',
              })
            }
            
          }
        },
        mounted() {
            console.log('Component mounted.');
            Fire.$on('AfterCreate', () => {
              this.updateInfo();
            })
        },

        created() {
          axios.get("api/profile")
          .then(({ data }) => (this.form.fill(data)));
        }
    }
</script>
