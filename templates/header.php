<div class="contain-to-grid">
  <header>
    <nav id='front-page-nav' data-topbar>
      <div class="container">
        <!-- TODO: add custom logo ssc here. -->
        <a href="<?php echo esc_url(home_url()); ?>" class="brand-logo"><?php bloginfo('name'); ?></a></li>

        <section class="top-bar-section">
        <div class="nav-wrapper">
          <?php if (has_nav_menu('primary_navigation')) :
            wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'right side-nav'));
          endif; ?>
        <a class="button-collapse" href="#" data-activates="menu-primary-navigation"><i class="mdi-navigation-menu"></i></a>
        </div>
      </section>
      </div>
    </nav>
  </header>
</div> <!-- contain-to-grid -->
